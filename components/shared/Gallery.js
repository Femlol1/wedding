// components/Gallery.js
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const Gallery = () => {
	const [images, setImages] = useState([]);

	useEffect(() => {
		const fetchImages = async () => {
			const res = await fetch("/api/gallery");
			const images = await res.json();
			setImages(images);
		};

		fetchImages();
	}, []);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
			{images.map((src, index) => (
				<div key={index} className="relative w-full h-64">
					<Image
						src={src}
						alt={`Gallery image ${index + 1}`}
						layout="fill"
						objectFit="cover"
						className="rounded-lg"
					/>
				</div>
			))}
		</div>
	);
};

export default Gallery;
