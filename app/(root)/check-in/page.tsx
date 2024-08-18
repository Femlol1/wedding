"use client";
import { useMediaStream } from '@/components/shared/useMediaStream';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const QrScanner = dynamic(() => import('react-qr-scanner'), { ssr: false });
interface CustomMediaTrackConstraints extends MediaTrackConstraints {
    video: {
      facingMode: 'user' | 'environment';
    };
  }

const CheckInPage = () => {
  const [guestId, setGuestId] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [constraints, setConstraints] = useState<CustomMediaTrackConstraints>({
    video: { facingMode: 'environment' }, // Start with environment (back) camera
  });

  const { stream, error } = useMediaStream(constraints);

  const handleCheckIn = async (id: string) => {
    if (!id) return;

    try {
      const rsvpDocRef = doc(db, 'rsvps', id);
      const rsvpDoc = await getDoc(rsvpDocRef);

      if (rsvpDoc.exists()) {
        await updateDoc(rsvpDocRef, { checkedIn: true });
        setMessage(`Guest ${rsvpDoc.data()?.firstName} ${rsvpDoc.data()?.lastName} checked in successfully!`);
        setShowModal(true); // Show the modal
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
    if (err.name === 'OverconstrainedError') {
      // Fallback to the user-facing camera if environment camera fails
      setConstraints({
        video: { facingMode: 'user' }, // Switch to the front camera
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
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
          <button type="submit" className="bg-primary-500 text-white px-4 py-2 rounded">
            Check In
          </button>
        </form>
      </div>

      <div className="mb-8 border-primary">
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={previewStyle}
          constraints={constraints} // Use the custom constraints state
        />
      </div>

      {message && <p className="mt-4 text-lg">{message}</p>}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-primary-900 text-white px-6 py-4 rounded-md text-center max-w-full mx-4 sm:mx-6 md:mx-8 lg:mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg">
            <h2 className="text-xl sm:text-2xl font-bold">Success!</h2>
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
