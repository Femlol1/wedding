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
          <Button className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
            <FiChevronRight className="text-6xl text-white" />
          </Button>
        </Link>
      </section>
        </div>
    );
}
