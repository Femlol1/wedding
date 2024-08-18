"use client";
// pages/admin/page.tsx
import { db } from '@/lib/firebase'; // Adjust the import according to your setup
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';

const AdminPage = () => {
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [userTypeFilter, setUserTypeFilter] = useState(''); // State for single user type filter
  const [stayingPlaceFilter, setStayingPlaceFilter] = useState(''); // State for staying place filter
  const [asoEbiFilter, setAsoEbiFilter] = useState(''); // State for Asoebi filter

  useEffect(() => {
    const fetchRSVPs = async () => {
      const rsvpCollection = collection(db, 'rsvps');  // Correctly reference the 'rsvps' collection
      const querySnapshot = await getDocs(rsvpCollection);
      const rsvpList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRsvps(rsvpList);
      setLoading(false);
    };
  
    fetchRSVPs();
  }, []);

  const handleCheckIn = async (id: string) => {
    const rsvpDocRef = doc(db, 'rsvps', id);  // Correctly reference the document by ID
    await updateDoc(rsvpDocRef, { checkedIn: true });
    setRsvps(prev =>
      prev.map(rsvp =>
        rsvp.id === id ? { ...rsvp, checkedIn: true } : rsvp
      )
    );
  };

  const handleCheckOut = async (id: string) => {
    const rsvpDocRef = doc(db, 'rsvps', id);  // Correctly reference the document by ID
    await updateDoc(rsvpDocRef, { checkedIn: false });
    setRsvps(prev =>
      prev.map(rsvp =>
        rsvp.id === id ? { ...rsvp, checkedIn: false } : rsvp
      )
    );
  };

  const handleDelete = async (id: string) => {
    const rsvpDocRef = doc(db, 'rsvps', id);  // Correctly reference the document by ID
    await deleteDoc(rsvpDocRef);
    setRsvps(prev =>
      prev.filter(rsvp => rsvp.id !== id)
    );
  };

  // Filtered and searched RSVP data
  const filteredRsvps = rsvps.filter(rsvp => {
    const matchesSearch = `${rsvp.firstName} ${rsvp.lastName}`.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUserType = userTypeFilter ? rsvp.userType === userTypeFilter : true;
    const matchesStayingPlace = stayingPlaceFilter ? rsvp.stayingPlace === stayingPlaceFilter : true;
    const matchesAsoEbi = asoEbiFilter ? rsvp.asoEbi === asoEbiFilter : true;

    return matchesSearch && matchesUserType && matchesStayingPlace && matchesAsoEbi;
  });

  // CSV Data preparation based on filtered data
  const csvData = filteredRsvps.map((rsvp) => ({
    'Guest Type': rsvp.userType,
    Relations: rsvp.relations,
    'First Name': rsvp.firstName,
    'Last Name': rsvp.lastName,
    Email: rsvp.email,
    Mobile: rsvp.mobile,
    'Staying Place': rsvp.stayingPlace ? rsvp.stayingPlace : 'N/A',
    Allergies: rsvp.allergies ? rsvp.allergies : 'None',
    Asoebi: rsvp.asoEbi ? `${rsvp.asoEbi} - ${rsvp.asoebiType}` : 'No',
    Church: rsvp.church ? 'Yes' : 'No',
    Reception: rsvp.reception ? 'Yes' : 'No',
    'After Party': rsvp.afterParty ? 'Yes' : 'No',
    'Checked In': rsvp.checkedIn ? 'Yes' : 'No',
    'RSVP Timestamp': new Date(rsvp.timestamp?.seconds * 1000).toLocaleString(),
  }));

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      
      {/* Search and Filter Inputs */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 p-2 border rounded"
        />

        <select
          value={userTypeFilter}
          onChange={(e) => setUserTypeFilter(e.target.value)}
          className="w-full md:w-1/2 p-2 border rounded"
        >
          <option value="">Filter by User Type</option>
          <option value="vip">VIP</option>
          <option value="opesGuest">Opes Guest</option>
          <option value="tolusGuest">Tolus Guest</option>
          <option value="osibemekunFamilyGuest">Osibemekun Family Guest</option>
          <option value="oyediranFamilyGuest">Oyediran Family Guest</option>
          <option value="bridalParty">Bridal Party</option>
        </select>

        <select
          value={stayingPlaceFilter}
          onChange={(e) => setStayingPlaceFilter(e.target.value)}
          className="w-full md:w-1/2 p-2 border rounded"
        >
          <option value="">Filter by Staying Place</option>
          <option value="Hotel">Hotel</option>
          <option value="Home">Home</option>
          {/* Add other staying place options */}
        </select>

        <select
          value={asoEbiFilter}
          onChange={(e) => setAsoEbiFilter(e.target.value)}
          className="w-full md:w-1/2 p-2 border rounded"
        >
          <option value="">Filter by AsoEbi</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Guest Type</th>
              <th className="px-4 py-2 text-left">Relations</th>
              <th className="px-4 py-2 text-left">First Name</th>
              <th className="px-4 py-2 text-left">Last Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Mobile</th>
              <th className="px-4 py-2 text-left">Staying Place</th>
              <th className="px-4 py-2 text-left">Allergies</th>
              <th className="px-4 py-2 text-left">Asoebi</th>
              <th className="px-4 py-2 text-left">Church</th>
              <th className="px-4 py-2 text-left">Reception</th>
              <th className="px-4 py-2 text-left">After Party</th>
              <th className="px-4 py-2 text-left">Checked In</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRsvps.map((rsvp) => (
              <tr key={rsvp.id} className="border-b">
                <td className="px-4 py-2">{rsvp.userType}</td>
                <td className="px-4 py-2">{rsvp.relations}</td>
                <td className="px-4 py-2">{rsvp.firstName}</td>
                <td className="px-4 py-2">{rsvp.lastName}</td>
                <td className="px-4 py-2">{rsvp.email}</td>
                <td className="px-4 py-2">{rsvp.mobile}</td>
                <td className="px-4 py-2">{rsvp.stayingPlace}, Other: {rsvp.otherStaying}</td>
                <td className="px-4 py-2">{rsvp.allergies}</td>
                <td className="px-4 py-2">{rsvp.asoEbi} + {rsvp.asoebiType}</td>
                <td className="px-4 py-2">{rsvp.church ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2">{rsvp.reception ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2">{rsvp.afterParty ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2">{rsvp.checkedIn ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2 flex justify-center gap-2">
                  {!rsvp.checkedIn ? (
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={() => handleCheckIn(rsvp.id)}
                    >
                      Check In
                    </button>
                  ) : (
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                      onClick={() => handleCheckOut(rsvp.id)}
                    >
                      Check Out
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(rsvp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center">
        <CSVLink
          data={csvData}
          filename={"filtered_rsvp_list.csv"}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Download Filtered CSV
        </CSVLink>
      </div>
    </div>
  );
};

export default AdminPage;
