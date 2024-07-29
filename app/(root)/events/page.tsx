// pages/events.js
"use client"
import EventDetails from '@/components/shared/EventDetails';
import dynamic from 'next/dynamic';
import { useState } from 'react';


const MapWithNoSSR = dynamic(() => import('@/components/shared/Map'), {
  ssr: false // This line is important. It's what prevents server-side render
});

export default function Events() {
  const [showDressCode, setShowDressCode] = useState(false);
  const events = [
    {
      time: "11am",
      title: "Church Ceremony",
      location: "Foursquare Gospel Church, Lekki Headquarters",
      coords: { lat: 6.524379, lng: 3.379206 }
    },
    {
      time: "3pm",
      title: "Reception",
      location: "The Monarch Event Centre",
      coords: { lat: 6.426043, lng: 3.421929 }
    },
    {
      time: "7pm",
      title: "After Party",
      location: "The Monarch Event Centre",
      coords: { lat: 6.426043, lng: 3.421929 }
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-center font-bold text-gray-800 mb-6 mt-12">Events</h1>
      {events.map((event, index) => (
        <EventDetails
          key={index}
          time={event.time}
          title={event.title}
          location={event.location}
          center={event.coords}
          setShowDressCode={setShowDressCode}
        />
      ))}

      {showDressCode && (
        <DressCodeModal onClose={() => setShowDressCode(false)} />
      )}
    </div>
  );
}

function DressCodeModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-bold">Dress Code</h3>
        <p>Chocolate and Gold or Emerald and Gold</p>
        <button
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
