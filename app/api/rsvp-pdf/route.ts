import { UserType, validCodes } from "@/constants/codes";
import { db, Timestamp } from "@/lib/firebaseAdmin";
import chromium from "chrome-aws-lambda";
import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb } from "pdf-lib";
import qrcode from "qrcode";

export async function POST(req: NextRequest) {
	try {
		const data = await req.json();
		const { code } = data;

		// 1. Validate code and determine userType
		let userType: UserType | null = null;
		for (const type in validCodes) {
			if (validCodes[type as UserType].includes(code)) {
				userType = type as UserType;
				break;
			}
		}

		if (!userType) {
			return NextResponse.json(
				{ message: "Invalid RSVP code." },
				{ status: 400 }
			);
		}

		// 2. Save RSVP data to Firestore
		const timestamp = Timestamp.now();
		const rsvpData = { ...data, userType, timestamp };
		const rsvpDocRef = await db.collection("rsvps").add(rsvpData);
		const rsvpDocId = rsvpDocRef.id;

		// 3. Generate QR code
		const qrCodeBuffer = await qrcode.toBuffer(rsvpDocId);

		// 4. Optionally, generate PDF with just the QR code (like you had before)
		//    but we won't attach it to an email. We'll keep it in memory, or ignore it.
		const pdfDoc = await PDFDocument.create();
		const page = pdfDoc.addPage([300, 150]);
		const pngImage = await pdfDoc.embedPng(new Uint8Array(qrCodeBuffer));
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
		const pdfBuffer = Buffer.from(pdfBytes);

		// 6. Construct the HTML you want to “capture”
		//    Replace `cid:` references with either absolute or base64 references for images.
		const htmlContent = `
      <html>
        <head>
          <meta charset="utf-8" />
          <title>RSVP Confirmation - Tolu & Ope</title>
        </head>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <div style="max-width: 600px; margin: auto; padding: 20px; background-color: #fff; border: 1px solid #e0e0e0; border-radius: 10px;">
            <!-- Example: If you need to show a local image, use an absolute URL or a base64 data URI -->
            <div style="text-align: center;">
              <img src="https://toluandope.com/assets/logo.png" alt="Wedding Logo" style="max-width: 200px;" />
            </div>

            <h2 style="color: #D4AF37; text-align: center;">Your RSVP is Confirmed!</h2>
            <p style="font-size: 16px; line-height: 1.5; color: #666; text-align: center;">
              Dear ${data.firstName} ${data.lastName},
            </p>
            <p style="font-size: 16px; line-height: 1.5; color: #666; text-align: center;">
              Thank you for your response to our Invitation! We are thrilled to celebrate this special day with you.
            </p>
            
            <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; margin-top: 20px;">
              <p style="font-size: 16px; line-height: 1.5; color: #333; text-align: center;">
                <strong>Your RSVP Code:</strong> ${rsvpDocId}
              </p>
            </div>

            <p style="font-size: 16px; line-height: 1.5; color: #666; text-align: center; margin-top: 20px;">
              The wedding is scheduled for <strong>22nd March 2025</strong>. Please save the date!
            </p>

            <!-- QR Code (replace with base64 or a hosted URL) -->
            <div style="text-align: center; margin-top: 20px;">
              <img src="data:image/png;base64,${qrCodeBuffer.toString(
								"base64"
							)}" alt="RSVP Code QR" />
            </div>

            <p style="font-size: 16px; line-height: 1.5; color: #666; text-align: center; margin-top: 20px;">
              Please keep this code safe as it will be needed for your entry to the event.
            </p>        
            <div style="text-align: center; margin-top: 20px;">
              <img src="https://toluandope.com/assets/hero.jpg" alt="Wedding Couple" style="max-width: 70%; height: auto; border-radius: 10px;" />
            </div>

            <p style="font-size: 16px; line-height: 1.5; color: #666; text-align: center; margin-top: 20px;">
              We look forward to celebrating with you on our special day!
            </p>
          </div>
        </body>
      </html>
    `;

		// 7. Use Puppeteer to convert that HTML into a PDF
		// const browser = await puppeteer.launch();
		const browser = await chromium.puppeteer.launch({
			args: chromium.args,
			executablePath: await chromium.executablePath,
			headless: chromium.headless,
		});
		const pagePuppeteer = await browser.newPage();

		// Pass the HTML in directly
		await pagePuppeteer.setContent(htmlContent, {
			waitUntil: "networkidle0",
		});

		// Generate PDF
		const finalPdfBuffer = await pagePuppeteer.pdf({
			format: "a4",
			printBackground: true,
		});

		await browser.close();

		// 8. Return the PDF as the response so the user can download it
		return new NextResponse(finalPdfBuffer, {
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": `attachment; filename="RSVP_Confirmation_${rsvpDocId}.pdf"`,
			},
		});
	} catch (error) {
		console.error("Error processing RSVP:", error);
		return NextResponse.json(
			{ result: "error", message: "Error processing RSVP." },
			{ status: 500 }
		);
	}
}
