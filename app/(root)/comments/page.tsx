"use client"; // This is important to ensure this component is client-side

import { db } from "@/lib/firebase"; // Adjust the import path to your Firebase configuration
import { collection, deleteDoc, doc, getDocs, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";

interface Comment {
  id: string;
  comment: string;
  timestamp: Timestamp;
  // Add other properties if needed, like a timestamp or user info
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
   // Add new states for date filtering
   const [startDate, setStartDate] = useState<Timestamp | null>(null);
   const [endDate, setEndDate] = useState<Timestamp | null>(null);
 

  useEffect(() => {
    const fetchComments = async () => {
      const commentsCollection = collection(db, "comments");
      const commentsSnapshot = await getDocs(commentsCollection);
      const commentsList = commentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Comment[];
      setComments(commentsList);
      setFilteredComments(commentsList); // Initially, show all comments
      setLoading(false);
    };

    fetchComments();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this message? This action cannot be undone.")) {
      await deleteDoc(doc(db, "comments", id));
      setComments(comments.filter((comment) => comment.id !== id));
      setFilteredComments(filteredComments.filter((comment) => comment.id !== id));
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query) {
      setFilteredComments(comments.filter((comment) =>
        comment.comment.toLowerCase().includes(query)
      ));
    } else {
      setFilteredComments(comments); // Reset to show all comments if search is cleared
    }
    if (startDate && endDate) {
      setFilteredComments(comments.filter((comment) => {
        const commentDate = comment.timestamp; // Assuming you have a timestamp field
        return (
          comment.comment.toLowerCase().includes(query) &&
          commentDate >= startDate && commentDate <= endDate
        );
      }));
    } else {
      setFilteredComments(comments.filter((comment) =>
        comment.comment.toLowerCase().includes(query)
      ));
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold mb-6">Admin Panel - Comments</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search comments..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-6 flex space-x-4">
        <input
          type="date"
          onChange={(e) => setStartDate(Timestamp.fromDate(new Date(e.target.value)))}
          className="p-2 border rounded"
        />
        <input
          type="date"
          onChange={(e) => setEndDate(Timestamp.fromDate(new Date(e.target.value)))}
          className="p-2 border rounded"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Comment</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredComments.map((comment) => (
              <tr key={comment.id} className="border-b">
                <td className="px-4 py-2">{comment.comment}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(comment.id)}
                  >
                    Delete
                  </button>
                  {/* You can add more buttons here for editing or other actions */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
