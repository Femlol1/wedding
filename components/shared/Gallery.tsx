"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Gallery = () => {
	const [images, setImages] = useState<string[]>([]);
	const [isCarouselOpen, setIsCarouselOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const fetchImages = async () => {
			const res = await fetch("/api/images");
			const images = await res.json();
			setImages(images);
		};

		fetchImages();
	}, []);

	const handleImageClick = (index: number): void => {
		setCurrentIndex(index);
		setIsCarouselOpen(true);
	};

	const closeCarousel = () => {
		setIsCarouselOpen(false);
	};

	interface OverlayClickEvent extends React.MouseEvent<HTMLDivElement> {
		currentTarget: EventTarget & HTMLDivElement;
	}

	const handleOverlayClick = (e: OverlayClickEvent): void => {
		if (e.target === e.currentTarget) {
			closeCarousel();
		}
	};

	return (
		<div>
			{/* Image Grid */}
			<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
				{images.map((src, index) => (
					<div
						key={index}
						className="relative w-full h-64"
						onClick={() => handleImageClick(index)}
					>
						<Image
							src={src}
							alt={`Gallery image ${index + 1}`}
							fill
							style={{ objectFit: "cover" }}
							className="rounded-lg cursor-pointer"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					</div>
				))}
			</div>

			{/* Modal Overlay */}
			{isCarouselOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-md"
					onClick={handleOverlayClick}
				>
					<div className="relative w-full max-w-4xl">
						<button
							className="absolute top-4 right-4 text-white text-2xl z-50"
							onClick={closeCarousel}
						>
							&times;
						</button>
						<ImageGallery
							items={images.map((src) => ({
								original: src,
								thumbnail: src,
							}))}
							startIndex={currentIndex}
							onSlide={(index) => setCurrentIndex(index)}
							showThumbnails
							showPlayButton
							showFullscreenButton
							thumbnailPosition="left"
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default Gallery;
