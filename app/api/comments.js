// pages/api/comments.js
let comments = []; // This should ideally be a database or persistent storage

export default function handler(req, res) {
	if (req.method === "POST") {
		const { comment } = req.body;
		const newComment = { comment, id: comments.length + 1 };
		comments.push(newComment);
		res.status(201).json(newComment);
	} else if (req.method === "GET") {
		res.status(200).json(comments);
	}
}
