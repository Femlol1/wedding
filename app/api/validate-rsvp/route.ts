// pages/api/checkRSVP.ts
import { db } from '@/lib/firebase'; // Adjust the path according to your project structure
import { collection, getDocs, query, where } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

const checkRSVP = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ valid: false, message: "Code is required" });
  }

  try {
    const rsvpQuery = query(collection(db, 'rsvps'), where('code', '==', code));
    const rsvpSnapshot = await getDocs(rsvpQuery);

    if (rsvpSnapshot.empty) {
      return res.status(200).json({ valid: false, message: "Invalid RSVP Code" });
    }

    const rsvpData = rsvpSnapshot.docs[0].data();
    return res.status(200).json({ valid: true, name: `${rsvpData.firstName} ${rsvpData.lastName}` });
  } catch (error) {
    console.error('Error checking RSVP:', error);
    return res.status(500).json({ valid: false, message: 'Internal Server Error' });
  }
};

export default checkRSVP;
