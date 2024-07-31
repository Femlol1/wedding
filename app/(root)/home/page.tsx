"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";


const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Image Section */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto">
          <Image
            src="/assets/images/whatsapp/222.jpeg" // Replace with your image path
            alt="Welcome Image"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="z-0"
          />
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20">
            <h1 className="text-4xl md:text-6xl font-bold">22 March 2025</h1>
            <h3 className="text-3xl md:text-5xl font-bold mt-2">Tolu and Ope</h3>
          </div>
        </div>
        {/* Text Section */}
        <div className="flex flex-col items-center justify-center py-10 px-5 bg-white w-full md:w-1/2">
          <h2 className="text-3xl font-semibold mb-4">Welcome</h2>
          <p className="text-xl text-center mb-8">
            Family + Friends,
            <br />
            Welcome to our wedding website – we’re so glad you’re here.
            <br />
            We’ve created this website as a helpful resource for all of the need-to-know details.
            <br />
            <br />
            <strong>Tolu and Ope Forever <br /><a><Link href={"https://www.instagram.com/explore/tags/TOFOREVER/"}>#TOforever</Link></a></strong>
          </p>
          <Link href="/rsvp">
            <Button className="text-white btn-fill font-bold py-2 px-4 rounded-full transition duration-200">
              RSVP
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;