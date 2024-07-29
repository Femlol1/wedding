// components/CommentsSection.js
"use client";
import { useEffect, useState } from "react";

export default function CommentsSection() {
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");

	useEffect(() => {
		fetch("/api/comments")
			.then((response) => response.json())
			.then((data) => setComments(data));
	}, []);

	const handleCommentSubmit = async (event) => {
		event.preventDefault();
		const response = await fetch("/api/comments", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ comment: newComment }),
		});
		const data = await response.json();
		setComments([...comments, data]);
		setNewComment("");
	};

	return (
		<div className="mt-6">
			<h2 className="text-2xl font-semibold text-center">
				Messages to the Bride and Groom
			</h2>
			<form onSubmit={handleCommentSubmit} className="my-4">
				<textarea
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					className="w-full p-2 border"
					placeholder="Leave a message..."
				/>
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mx-auto mt-2"
				>
					Submit
				</button>
			</form>
			<div>
				{comments.map((comment, index) => (
					<p key={index} className="bg-gray-100 rounded p-2 my-2">
						{comment.comment}
					</p>
				))}
			</div>
		</div>
	);
}
