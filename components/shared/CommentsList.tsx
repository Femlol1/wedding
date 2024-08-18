"use client"; // This is important to ensure this component is client-side

import { db } from "@/lib/firebase"; // Adjust the import path to your Firebase configuration
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Comment {
  comment: string;
  // Add other properties if needed, like an id
}

export default function CommentsList() {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const commentsCollection = collection(db, "comments");
      const commentsSnapshot = await getDocs(commentsCollection);
      const commentsList = commentsSnapshot.docs.map((doc) => doc.data() as Comment);
      setComments(commentsList);
    };

    fetchComments();
  }, []);

  return (
    <div className="">
      <h2 className="text-2xl font-semibold text-center">
        Messages to the Bride and Groom
      </h2>

      <div className="relative overflow-hidden container">
        <div className="flex whitespace-nowrap animate-scroll gap-4 py-1">
          {[...comments, ...comments].map((comment, index) => (
            <div
              key={index} // Using index as a key is acceptable if there's no other unique identifier
              className="bg-primary-50 rounded-full p-4 mx-2 min-w-[200px] shadow-md text-center flex-shrink-0 flex flex-col items-center"
            >
              <Image
                src={"/assets/icons/heart.png"}
                alt="heart"
                width={20}
                height={20}
                className="mb-2 text-center"
              />
              {comment.comment}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
