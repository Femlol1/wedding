import nodemailer from "nodemailer";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { name, email } = req.body;

		// Configure your email transport
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		// Email content
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: email,
			subject: "RSVP Confirmation",
			text: `Hello ${name},\n\nThank you for your RSVP!\n\nBest regards,\nEvent Team`,
		};

		try {
			await transporter.sendMail(mailOptions);
			res.status(200).json({ message: "RSVP confirmed and email sent!" });
		} catch (error) {
			res.status(500).json({ error: "Failed to send email" });
		}
	} else {
		res.status(405).json({ error: "Method not allowed" });
	}
}
