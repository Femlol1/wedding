"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from 'react';
import { FiChevronRight } from "react-icons/fi";
import Events from "../events/page";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen mt-20">
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Image Section */}
        <section className="relative w-full md:w-1/2 h-64 md:h-auto">
          <Image
            src="/assets/images/whatsapp/222.jpeg" // Replace with your image path
            alt="Welcome Image"
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
            className="z-0"
          />
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20">
            <h1 className="text-4xl md:text-6xl font-bold">22 March 2025</h1>
            <h3 className="text-3xl md:text-5xl font-bold mt-2">Tolu and Ope</h3>
          </div>
        </section>
        {/* Text Section */}
        <section className="flex flex-col items-center justify-center py-10 px-5 bg-white w-full md:w-1/2">
          <h2 className="text-3xl font-semibold mb-4 text-center">Welcome to Our Wedding Website!</h2>
          <p className="text-xl text-center mb-8">
            Family + Friends,
            <br />
            Thank you for sharing this special moment with us!
            <br />
            We are overjoyed to announce our wedding and delighted to share this special journey with our cherished friends and family. This website is your one-stop destination for all the details you need to celebrate our big day with us.
            <br />
            <br />
            Please note, our wedding is by INVITE only. No extra guests, please, unless approved by us to maintain a safe, intimate celebration.
            <br />
            <strong>Please do not bring Kids</strong>
            <br />
            <br />
            <strong>Tolu and Ope Forever <br /><Link href={"https://www.instagram.com/explore/tags/TOFOREVER/"}>#TOforever</Link></strong>
          </p>
          <Link href="/rsvp">
            <Button className="text-white btn-fill font-bold py-2 px-4 rounded-full transition duration-200">
              RSVP
            </Button>
          </Link>
        </section>
      </div>
      <section className="flex flex-col items-center justify-center py-10 px-5 bg-white w-full">
        <h2 className="text-3xl font-semibold mb-4">Events</h2>
        <Events />
      </section>
      <section className="fixed bottom-4 right-4 z-20">
        <Link href="/rsvp">
          <Button className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
            <FiChevronRight className="text-6xl text-white" />
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
