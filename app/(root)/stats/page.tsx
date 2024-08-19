// pages/stats.tsx
"use client";
import { db } from '@/lib/firebase'; // Adjust the import according to your setup
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const StatsPage = () => {
  const [stats, setStats] = useState({
    totalRSVPs: 0,
    yesToAsoebi: 0,
    noToAsoebi: 0,
    attendingChurch: 0,
    attendingReception: 0,
    attendingAfterParty: 0,
    checkedIn: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const rsvpCollection = collection(db, 'rsvps');
      const querySnapshot = await getDocs(rsvpCollection);

      let totalRSVPs = 0;
      let yesToAsoebi = 0;
      let noToAsoebi = 0;
      let attendingChurch = 0;
      let attendingReception = 0;
      let attendingAfterParty = 0;
      let checkedIn = 0;

      querySnapshot.docs.forEach((doc) => {
        const data = doc.data();

        totalRSVPs += 1;
        if (data.asoEbi === 'Yes') yesToAsoebi += 1;
        if (data.asoEbi === 'No') noToAsoebi += 1;
        if (data.church === 'Yes') attendingChurch += 1;
        if (data.reception === 'Yes') attendingReception += 1;
        if (data.afterParty === 'Yes') attendingAfterParty += 1;
        if (data.checkedIn) checkedIn += 1;
      });

      setStats({
        totalRSVPs,
        yesToAsoebi,
        noToAsoebi,
        attendingChurch,
        attendingReception,
        attendingAfterParty,
        checkedIn,
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold mb-6">Event Statistics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total RSVPs</h2>
          <p className="text-3xl font-bold">{stats.totalRSVPs}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Yes to Asoebi</h2>
          <p className="text-3xl font-bold">{stats.yesToAsoebi}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">No to Asoebi</h2>
          <p className="text-3xl font-bold">{stats.noToAsoebi}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Attending Church</h2>
          <p className="text-3xl font-bold">{stats.attendingChurch}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Attending Reception</h2>
          <p className="text-3xl font-bold">{stats.attendingReception}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Attending After Party</h2>
          <p className="text-3xl font-bold">{stats.attendingAfterParty}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Checked In</h2>
          <p className="text-3xl font-bold">{stats.checkedIn}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
