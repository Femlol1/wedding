"use client";
import FlipClock from "react-flip-clock";

const Countdown = ({ eventDate }) => {
	const event = new Date(eventDate).getTime();
	const now = new Date().getTime();
	const remainingTime = (event - now) / 1000; // Time in seconds

	return (
		<div className="flex justify-center my-8">
			<FlipClock
				countdown
				seconds={remainingTime} // Countdown in seconds
				showSeconds
				showMinutes
				showHours
				showDays
			/>
		</div>
	);
};

export default Countdown;
