"use client";
import { db } from '@/lib/firebase'; // Adjust the import according to your setup
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const QrScanner = dynamic(() => import("react-qr-scanner"), { ssr: false });

const CheckInPage = () => {
  const [guestId, setGuestId] = useState('');
  const [message, setMessage] = useState('');

  const handleCheckIn = async (id: string) => {
    if (!id) return;

    try {
      const rsvpDocRef = doc(db, 'rsvps', id);
      const rsvpDoc = await getDoc(rsvpDocRef);

      if (rsvpDoc.exists()) {
        await updateDoc(rsvpDocRef, { checkedIn: true });
        setMessage(`Guest ${rsvpDoc.data()?.firstName} ${rsvpDoc.data()?.lastName} checked in successfully!`);
      } else {
        setMessage('Guest not found. Please check the ID and try again.');
      }
    } catch (error) {
      console.error('Error checking in guest:', error);
      setMessage('Error checking in guest. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuestId(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCheckIn(guestId);
    setGuestId('');
  };

  const handleScan = (data: any) => {
    if (data) {
      handleCheckIn(data.text);
    }
  };

  const handleError = (err: any) => {
    console.error('QR scan error:', err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
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
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Check In
          </button>
        </form>
      </div>

      <div className="mb-8">
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={previewStyle}
          constraints={{
            facingMode: "environment", // This requests the back camera
          }}
        />
      </div>

      {message && <p className="mt-4 text-lg">{message}</p>}
    </div>
  );
};

export default CheckInPage;
