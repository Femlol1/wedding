"use client";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Gallery = () => {
	const [images, setImages] = useState([]);
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

	const handleImageClick = (index) => {
		setCurrentIndex(index);
		setIsCarouselOpen(true);
	};

	const closeCarousel = () => {
		setIsCarouselOpen(false);
	};

	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget) {
			closeCarousel();
		}
	};

	return (
		<div>
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

			{isCarouselOpen && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
					onClick={handleOverlayClick}
				>
					<Carousel
						opts={{
							align: "start",
							startIndex: currentIndex,
						}}
						plugins={[
							Autoplay({
								delay: 2000,
							}),
						]}
						selectedItem={currentIndex}
						showThumbs={false}
						className="w-full max-w-sm"
					>
						<CarouselContent className="-ml-2 md:-ml-4">
							{images.map((src, index) => (
								<CarouselItem
									key={index}
									className="flex justify-center items-center"
								>
									<Image
										src={src}
										alt={`Gallery image ${index + 1}`}
										width={700}
										height={100}
									/>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
			)}
		</div>
	);
};

export default Gallery;
