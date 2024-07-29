import Image from "next/image";

// components/GuestBook.js
export default function GuestBook() {
	const qrCodeUrl = "/public/assets/icons/why.png"; // This URL should lead to a QR code image
	return (
		<div className="text-center mb-6">
			<h2 className="text-2xl font-semibold">Guest Book</h2>
			<Image
				src={qrCodeUrl}
				alt="QR Code"
				className="mx-auto"
				width={300}
				height={300}
			/>
			<p>Scan to sign our guest book!</p>
		</div>
	);
}
