import { UserType, validCodes } from '@/constants/codes';
import { db, storage } from '@/lib/firebaseAdmin';
import bwipjs from 'bwip-js';
import { Workbook } from 'exceljs';
import { Timestamp } from 'firebase-admin/firestore';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { PDFDocument, rgb } from 'pdf-lib';
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

    // Generate a PDF with the barcode
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([300, 150]);
    const pngImage = await pdfDoc.embedPng(barcodeBuffer);
    const { width, height } = pngImage.scale(1);

    page.drawImage(pngImage, {
      x: page.getWidth() / 2 - width / 2,
      y: page.getHeight() / 2 - height / 2,
      width,
      height,
    });

    page.drawText(`RSVP Code: ${rsvpDocId}`, {
      x: 10,
      y: 10,
      size: 12,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();

    // Convert pdfBytes (Uint8Array) to Buffer
    const pdfBuffer = Buffer.from(pdfBytes);

    // Send confirmation email with PDF attachment
    const mailOptions = {
      from: process.env.OUTLOOK_USER,
      to: data.email,
      subject: "RSVP Confirmation - Tolu and ope's wedding",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <div style="max-width: 600px; margin: auto; padding: 20px; background-color: #fff; border: 1px solid #e0e0e0; border-radius: 10px;">
            <div style="text-align: center; padding: 10px;">
              <img src="cid:weddingLogo" alt="Wedding Logo" style="max-width: 200px;"/>
            </div>
            
            <h2 style="color: #D4AF37; text-align: center;">Your RSVP is Confirmed!</h2>
            
            <p style="font-size: 16px; line-height: 1.5; color: #666; text-align: center;">
              Dear ${data.firstName} ${data.lastName},
            </p>
            
            <p style="font-size: 16px; line-height: 1.5; color: #666; text-align: center;">
              Thank you for RSVPing to our wedding! We are thrilled to celebrate this special day with you.
            </p>
            
            <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; margin-top: 20px;">
              <p style="font-size: 16px; line-height: 1.5; color: #333; text-align: center;">
                <strong>Your RSVP Code:</strong> ${rsvpDocId}
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <img src="cid:barcode" alt="RSVP Code Barcode" style="max-width: 100%; height: auto;" />
            </div>
            
            <p style="font-size: 16px; line-height: 1.5; color: #666; text-align: center; margin-top: 20px;">
              Please keep this code safe as it will be needed for your entry to the event.
            </p>
            
            <div style="text-align: center; margin-top: 20px;">
              <img src="cid:weddingCoupleImage" alt="Wedding Couple" style="max-width: 100%; height: auto; border-radius: 10px;" />
            </div>
            
            <p style="font-size: 16px; line-height: 1.5; color: #666; text-align: center; margin-top: 20px;">
              We look forward to celebrating with you on our special day!
            </p>
            
            <div style="text-align: center; margin-top: 20px;">
              <p style="font-size: 14px; line-height: 1.5; color: #999;">
                With love,<br/>
                Tolu and Ope
              </p>
            </div>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: 'RSVP_Code.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
        {
          filename: 'weddingLogo.png',
          path: 'public/assets/images/Wedding-email/wedding-logo.jpeg', // Replace with actual path to your logo image
          cid: 'weddingLogo' // This is referenced in the HTML above with <img src="cid:weddingLogo" />
        },
        {
          filename: 'barcode.png',
          content: barcodeBuffer,
          cid: 'barcode' // This is referenced in the HTML above with <img src="cid:barcode" />
        },
        {
          filename: 'weddingCoupleImage.jpg',
          path: 'public/assets/hero.jpg', // Replace with actual path to your couple image
          cid: 'weddingCoupleImage' // This is referenced in the HTML above with <img src="cid:weddingCoupleImage" />
        }
      ],
    };
    
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.GMAIL_USER,
    //     pass: process.env.GMAIL_PASS, // Use the app password here
    //   },
    // });
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.OUTLOOK_USER, // Your Outlook email address
        pass: process.env.OUTLOOK_PASS, // Your Outlook email password or app password
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
