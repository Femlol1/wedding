// pages/guests.js
import CommentsSection from '@/components/shared/CommentsSection';
import GuestBook from '@/components/shared/GuestBook';
import SocialMediaLinks from '@/components/shared/SocialMediaLinks';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

export default function Guests() {
    return (
        <div className="container mx-auto px-4 py-8 mt-20">
            <h1 className="text-3xl font-bold text-center mb-6">Guest Page</h1>
            <SocialMediaLinks />
            <GuestBook />
            <CommentsSection />
            <section className="fixed bottom-4 right-4 z-20">
                <Link href="/travel">
                <Button className="w-12 h-12 text-white btn-fill font-bold py-2 px-3 rounded-full transition duration-200 flex items-center justify-center shadow-lg">
                  <FiChevronRight className="text-2xl text-white" />
                </Button>
                </Link>
            </section>
        </div>
    );
}
