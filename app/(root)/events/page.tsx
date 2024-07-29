// pages/events.js
"use client"
import DressCodeModal from '@/components/shared/DressCodeModal';
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

