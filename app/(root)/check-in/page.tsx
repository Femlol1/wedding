"use client";
import { db, doc, getDoc, updateDoc } from "@/lib/firebase";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

const CheckInPage = () => {
	const [guestId, setGuestId] = useState("");
	const [message, setMessage] = useState("");
	const [showModal, setShowModal] = useState(false);
	const scannerRef = useRef<HTMLDivElement | null>(null);

	const handleCheckIn = async (id: string) => {
		if (!id) return;

		try {
			const rsvpDocRef = doc(db, "rsvps", id);
			const rsvpDoc = await getDoc(rsvpDocRef);

			if (rsvpDoc.exists()) {
				await updateDoc(rsvpDocRef, { checkedIn: true });
				setMessage(
					`Guest ${rsvpDoc.data()?.firstName} ${
						rsvpDoc.data()?.lastName
					} checked in successfully!`
				);
				setShowModal(true);
			} else {
				setMessage("Guest not found. Please check the ID and try again.");
				setShowModal(true);
			}
		} catch (error) {
			console.error("Error checking in guest:", error);
			setMessage("Error checking in guest. Please try again.");
			setShowModal(true);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setGuestId(e.target.value);
	};

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleCheckIn(guestId);
		setGuestId("");
	};

	useEffect(() => {
		if (scannerRef.current) {
			const html5QrcodeScanner = new Html5QrcodeScanner(
				scannerRef.current.id,
				{
					fps: 10,
					qrbox: { width: 250, height: 250 },
				},
				false
			);

			html5QrcodeScanner.render(
				(decodedText) => {
					handleCheckIn(decodedText);
				},
				(error) => {
					console.error("QR scan error:", error);
				}
			);

			return () => {
				html5QrcodeScanner.clear().catch((error) => {
					console.error("Failed to clear QR scanner:", error);
				});
			};
		}
	}, []);

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<div className="container mx-auto px-4 py-8 mt-20 text-center">
			<h1 className="text-3xl font-bold mb-6">Guest Check-In</h1>

			<div className="mb-8">
				<form onSubmit={handleFormSubmit}>
					<input
						type="text"
						placeholder="Enter Guest ID"
						value={guestId}
						onChange={handleInputChange}
						className="w-full md:w-1/2 p-2 border rounded mb-4"
					/>
					<button
						type="submit"
						className="bg-primary-500 text-white px-4 py-2 rounded"
					>
						Check In
					</button>
				</form>
			</div>

			<div className="flex items-center justify-center mb-8">
				<div
					id="qr-reader"
					ref={scannerRef}
					style={{
						width: "320px",
						border: "5px solid gold", // Add a gold border
						borderRadius: "10px", // Optional: add some rounded corners
						padding: "10px", // Optional: add padding to enhance the appearance
					}}
				/>
			</div>

			{message && <p className="mt-4 text-lg">{message}</p>}

			{/* Modal */}
			{showModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-primary-900 text-white px-6 py-4 rounded-md text-center max-w-full mx-4 sm:mx-6 md:mx-8 lg:mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg">
						<h2 className="text-xl sm:text-2xl font-bold">Notification</h2>
						<p className="text-sm sm:text-base mt-2">{message}</p>
						<button
							onClick={closeModal}
							className="mt-4 bg-white text-primary-700 px-4 py-2 rounded"
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default CheckInPage;
