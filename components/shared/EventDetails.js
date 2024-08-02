// components/EventDetails.js
import Link from "next/link";
import { Button } from "../ui/button";

function EventDetails({ time, title, location, setShowDressCode, gmap }) {
	return (
		<div className="bg-white shadow-lg rounded-lg p-6 mb-6">
			<h2 className="text-xl font-semibold">
				{time} - {title}
			</h2>
			<p className="text-gray-600">{location}</p>
			<div className="mt-4 flex justify-between">
				<Button
					className="text-white btn-fill font-bold py-2 px-4 rounded-full transition duration-200"
					onClick={() => setShowDressCode(true)}
				>
					Dress Code
				</Button>
				<Link href={`${gmap}`}>
					<Button className="text-white btn-fill font-bold py-2 px-4 rounded-full transition duration-200">
						Google map
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default EventDetails;
