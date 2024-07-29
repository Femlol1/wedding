// components/EventDetails.js
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
	width: "100%",
	height: "300px",
};

function EventMap({ center }) {
	return (
		<LoadScript googleMapsApiKey="AIzaSyCQfPpWo6_-e8fI8g_th05QwNTAh3GZoEE">
			<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
				<Marker position={center} />
			</GoogleMap>
		</LoadScript>
	);
}

function EventDetails({ time, title, location, center, setShowDressCode }) {
	return (
		<div className="bg-white shadow-lg rounded-lg p-6 mb-6">
			<h2 className="text-xl font-semibold">
				{time} - {title}
			</h2>
			<p className="text-gray-600">{location}</p>
			<button
				className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				onClick={() => setShowDressCode(true)}
			>
				View Dress Code
			</button>
			{center && <EventMap center={center} />}
		</div>
	);
}

export default EventMap;
