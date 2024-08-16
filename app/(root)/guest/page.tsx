// pages/guests.js
import CommentForm from '@/components/shared/CommentForm';
import CommentsList from '@/components/shared/CommentsList';
import GuestBook from '@/components/shared/GuestBook';
import { Button } from '@/components/ui/button';
import Image from "next/image";
import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';


export default function Guests() {
    return (
    <div className="flex flex-col min-h-screen">
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
            <h3 className="text-3xl md:text-5xl font-bold mt-2">Guests</h3>
          </div>
        </section>
        <div className="container mx-auto px-4 py-8">
            <CommentsList/>
            <GuestBook />
            <CommentForm />
            {/* <CommentsSection /> */}
            <section className="fixed bottom-4 right-4 z-20">
                <Link href="/travel">
                <Button className="w-12 h-12 text-white btn-fill font-bold py-2 px-3 rounded-full transition duration-200 flex items-center justify-center shadow-lg">
                  <FiChevronRight className="text-2xl text-white" />
                </Button>
                </Link>
            </section>
        </div>
        </div>
        </div>
    );
}
