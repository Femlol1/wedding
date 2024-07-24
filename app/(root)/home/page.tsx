"use client"

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const HomePage: React.FC = () => {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch('/api/gallery');
      const images = await res.json();
      setGalleryImages(images);
    };
    fetchImages();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mt-8">Welcome to Our Wedding</h1>
      <p className="text-center mt-4">Join us on our special day!</p>

      <div className="carousel-container my-8 mx-auto w-4/5 max-w-lg">
        <Carousel showThumbs={true} autoPlay infiniteLoop>
          {galleryImages.map((src, index) => (
            <div key={index} className="carousel-image">
              <Image src={src} alt={`Gallery image ${index + 1}`} width={500} height={300}  className="object-cover w-full h-60 " />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="text-center">
        <Link href="/rsvp">
          <Button className="inline-block px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">RSVP</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
