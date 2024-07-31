"use client"

import { Button } from '@/components/ui/button';
import { animated, useTransition } from '@react-spring/web';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const WelcomePage: React.FC = () => {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [currentBackground, setCurrentBackground] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch('/api/gallery');
      const images = await res.json();
      setGalleryImages(images);
      if (images.length > 0) {
        setCurrentBackground(images[0]);
        setLoaded(true);
        let index = 0;
        setInterval(() => {
          index = (index + 1) % images.length;
          setCurrentBackground(images[index]);
          setCurrentIndex(index);
        }, 5000); // Change image every 5 seconds
      }
    };
    fetchImages();
  }, []);

  const transitions = useTransition(currentBackground, {
    from: { opacity: 0, transform: 'translateX(100%)' },
    enter: { opacity: 1, transform: 'translateX(0%)' },
    leave: { opacity: 0, transform: 'translateX(-100%)' },
    config: { duration: 2000 },
  });

  return (
    <div className="min-h-screen flex flex-col justify-between pt-16 pb-16 relative overflow-hidden">
      <section className="flex-1 mt-[64px] md:mt-[72px]"> {/* Adjust margin-top according to header height */}
        {transitions((style, item) =>
          loaded && (
            <animated.div
              key={currentIndex}
              className="absolute inset-0"
              style={{
                ...style,
                backgroundImage: `url(${item})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          )
        )}
      </section>
      <section className="flex items-center justify-center flex-grow relative z-10 h-[calc(50vh-64px)] md:h-[calc(50vh-72px)]"> {/* Adjust height according to header height */}
        <div className="bg-black bg-opacity-50 p-4 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-center text-white mt-8">Welcome to Our Wedding</h1>
          <p className="text-center text-white mt-4">Join us on our special day!</p>
          <div className="text-center mt-8">
            <Link href="/rsvp">
              <Button className="inline-block px-6 py-3 bg-amber-500 text-white rounded-md hover:bg-yellow-700 transition-colors duration-200">RSVP</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;
