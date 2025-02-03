"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import QRCode from "qrcode";
import React, { useEffect, useRef, useState } from "react";

// Dynamically import html2pdf.js only on the client side.
const html2pdf = dynamic(() => import("html2pdf.js"), { ssr: false });

interface RsvpConfirmationProps {
	rsvp: {
		id: string;
		firstName: string;
		lastName: string;
		// Add any additional fields you need
	};
}

const RsvpConfirmation: React.FC<RsvpConfirmationProps> = ({ rsvp }) => {
	const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Generate the QR code as a data URL based on the RSVP id
		QRCode.toDataURL(rsvp.id)
			.then((url) => setQrCodeDataUrl(url))
			.catch((err) => console.error("Error generating QR code", err));
	}, [rsvp.id]);

	const handleDownloadPdf = async () => {
		if (!contentRef.current) return;
		// Because html2pdf is dynamically imported, ensure it is loaded:
		const html2pdfModule = (await import("html2pdf.js")).default;
		const options = {
			margin: 0.5,
			filename: `RSVP_${rsvp.firstName}_${rsvp.lastName}.pdf`,
			image: { type: "jpeg", quality: 0.98 },
			html2canvas: { scale: 2 },
			jsPDF: { unit: "in", format: "A4", orientation: "portrait" },
		};
		html2pdfModule().set(options).from(contentRef.current).save();
	};

	return (
		<div className="flex flex-col items-center">
			<button
				onClick={handleDownloadPdf}
				className="bg-purple-500 text-white px-3 py-1 rounded mb-4"
			>
				Download Confirmation
			</button>

			{/* Hidden element used for PDF generation */}
			<div className="hidden">
				<div
					ref={contentRef}
					className="max-w-xl mx-auto p-8 bg-white border border-gray-200 rounded-lg text-center"
				>
					<div className="mb-4 relative">
						<Image
							src="/assets/logo.png"
							alt="Wedding Logo"
							width={100}
							height={100}
							className="mx-auto"
							sizes="(max-width: 500px) 100vw, (max-width: 600px) 50vw, 33vw"
							style={{ objectFit: "contain" }}
						/>
					</div>
					<h2 className="text-2xl font-bold text-yellow-600 mb-2">
						Your RSVP is Confirmed!
					</h2>
					<p className="text-base mb-2">
						Dear {rsvp.firstName} {rsvp.lastName},
					</p>
					<p className="text-base mb-4">
						This is your RSVP. We look forward to celebrating with you!
					</p>
					<div className="bg-gray-100 p-4 rounded-lg mb-4">
						<p className="text-base">
							<strong>Your RSVP Code:</strong> {rsvp.id}
						</p>
					</div>
					<p className="text-base mb-4">
						The wedding is scheduled for <strong>22nd March 2025</strong>.
					</p>
					{qrCodeDataUrl && (
						<div className="mb-4">
							<Image
								src={qrCodeDataUrl}
								alt="RSVP QR Code"
								width={100}
								height={100}
								className="mx-auto"
							/>
						</div>
					)}
					<p className="text-base mb-4">
						Please keep this code safe as it will be needed for your entry.
					</p>
					<div className="mb-4 relative">
						<Image
							src="/assets/hero.jpg"
							alt="Wedding Couple"
							width={500}
							height={500}
							className="rounded-lg"
							sizes="(max-width: 500px) 100vw, (max-width: 600px) 50vw, 33vw"
							style={{ objectFit: "contain" }}
						/>
					</div>
					<p className="text-base">We look forward to celebrating with you!</p>
				</div>
			</div>
		</div>
	);
};

export default RsvpConfirmation;
