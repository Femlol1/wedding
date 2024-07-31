"use client";
import { useEffect, useState } from "react";

const Countdown = ({ eventDate }) => {
	const [timeLeft, setTimeLeft] = useState("");

	useEffect(() => {
		const timer = setInterval(() => {
			const now = new Date();
			const event = new Date(eventDate);
			const difference = event - now;

			const days = Math.floor(difference / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((difference % (1000 * 60)) / 1000);

			setTimeLeft(
				`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
			);
		}, 1000);

		return () => clearInterval(timer);
	}, [eventDate]);

	return (
		<div className="text-center my-4 text-1xl font-bold">
			Countdown to Wedding: {timeLeft}
		</div>
	);
};

export default Countdown;
