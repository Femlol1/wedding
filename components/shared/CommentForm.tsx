"use client";

import { db } from "@/lib/firebase"; // Adjust the import path to your Firebase configuration
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export default function CommentForm() {
	const [newComment, setNewComment] = useState("");

	const handleCommentSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (newComment.trim() === "") return;

		const commentData = {
			comment: newComment,
			timestamp: Timestamp.now(),
		};

		try {
			// Add a new document with the comment data
			await addDoc(collection(db, "comments"), commentData);
			// Clear the input after submission
			setNewComment("");
		} catch (error) {
			console.error("Error adding comment: ", error);
		}
	};

	return (
		<div className="mt-6">
			<h2 className="text-2xl font-semibold text-center">
				Leave a Message for the Bride and Groom
			</h2>
			<form onSubmit={handleCommentSubmit} className="my-4">
				<Textarea
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					className="w-full p-2 border"
					placeholder="Leave a message..."
				/>
				<Button
					type="submit"
					className="bg-primary hover:bg-primary-700 font-bold py-2 px-4 rounded block mx-auto mt-2"
				>
					Send
				</Button>
			</form>
		</div>
	);
}
