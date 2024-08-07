import { UserType, validCodes } from '@/constants/codes';
import { db, storage } from '@/lib/firebaseAdmin';
import bwipjs from 'bwip-js';
import { Workbook } from 'exceljs';
import { Timestamp } from 'firebase-admin/firestore';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Readable } from 'stream';

const EXCEL_FILE_NAME = 'rsvps.xlsx';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { code } = data;

    // Find the user type based on the provided code
    let userType: UserType | null = null;
    for (const type in validCodes) {
      if (validCodes[type as UserType].includes(code)) {
        userType = type as UserType;
        break;
      }
    }

    if (!userType) {
      return NextResponse.json({ message: 'Invalid RSVP code.' }, { status: 400 });
    }

    // Add timestamp to data
    const timestamp = Timestamp.now();
    const rsvpData = { ...data, userType, timestamp };

    // Save RSVP data to Firestore and get document ID
    const rsvpDocRef = await db.collection('rsvps').add(rsvpData);
    const rsvpDocId = rsvpDocRef.id;

    // Generate barcode for the document ID
    const barcodeBuffer = await bwipjs.toBuffer({
      bcid: 'code128',       // Barcode type
      text: rsvpDocId,       // Text to encode
      scale: 3,              // 3x scaling factor
      height: 10,            // Bar height, in millimeters
      includetext: true,     // Show human-readable text
      textxalign: 'center',  // Always good to set this
    });

    // Convert barcode buffer to base64
    const barcodeBase64 = barcodeBuffer.toString('base64');
    const barcodeDataUrl = `data:image/png;base64,${barcodeBase64}`;

    // Send confirmation email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: data.email,
      subject: 'RSVP Confirmation',
      html: `
        <p>Dear ${data.firstName} ${data.lastName},</p>
        <p>Thank you for your RSVP!</p>
        <p>Your RSVP Code is: ${rsvpDocId}</p>
        <p><img src="${barcodeDataUrl}" alt="RSVP Code Barcode" /></p>
      `,
    };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, // Use the app password here
      },
    });

    await transporter.sendMail(mailOptions);

    // Update Excel file in Firebase Storage
    await updateExcel({ ...rsvpData, docId: rsvpDocId });

    return NextResponse.json({ result: 'success', message: 'RSVP received and confirmation email sent.' }, { status: 200 });
  } catch (error) {
    console.error('Error processing RSVP:', error);
    return NextResponse.json({ result: 'error', message: 'Error processing RSVP.' }, { status: 500 });
  }
}

const updateExcel = async (newData: any) => {
  try {
    const bucket = storage.bucket(process.env.FIREBASE_STORAGE_BUCKET);
    const file = bucket.file(EXCEL_FILE_NAME);
    const rows: any[] = [];

    const exists = await file.exists();
    let workbook = new Workbook();

    let sheet;
    if (exists[0]) {
      // File exists, download and parse the existing Excel file
      const [fileContents] = await file.download();
      await workbook.xlsx.load(fileContents);
      sheet = workbook.getWorksheet('RSVPs');
    } else {
      // File does not exist, create a new workbook and add headers
      sheet = workbook.addWorksheet('RSVPs');
      sheet.columns = [
        { header: 'Document ID', key: 'docId' },
        { header: 'First Name', key: 'firstName' },
        { header: 'Last Name', key: 'lastName' },
        { header: 'Email', key: 'email' },
        { header: 'Mobile', key: 'mobile' },
        { header: 'Staying Place', key: 'stayingPlace' },
        { header: 'Other Staying', key: 'otherStaying' },
        { header: 'Allergies', key: 'allergies' },
        { header: 'AsoEbi', key: 'asoEbi' },
        { header: 'Relations', key: 'relations' },
        { header: 'Church', key: 'church' },
        { header: 'Reception', key: 'reception' },
        { header: 'After Party', key: 'afterParty' },
        { header: 'RSVP', key: 'rsvp' },
        { header: 'User Type', key: 'userType' },
        { header: 'Timestamp', key: 'timestamp' },
      ];
    }

    if (!sheet) {
      throw new Error('Worksheet could not be created or accessed.');
    }

    const formattedData = {
      ...newData,
      timestamp: newData.timestamp.toDate().toISOString(),
    };
    sheet.addRow(formattedData);

    // Convert workbook to buffer and upload to Firebase Storage
    const buffer = await workbook.xlsx.writeBuffer();

    // Convert buffer to readable stream
    const bufferStream = new Readable();
    bufferStream.push(buffer);
    bufferStream.push(null); // End the stream

    await file.save(bufferStream, {
      metadata: { contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    });

    console.log('Excel file updated successfully');
  } catch (error) {
    console.error('Error updating Excel:', error);
  }
};
