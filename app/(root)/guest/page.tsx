// pages/guests.js
import CommentsSection from '@/components/shared/CommentsSection';
import GuestBook from '@/components/shared/GuestBook';
import SocialMediaLinks from '@/components/shared/SocialMediaLinks';

export default function Guests() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">Guest Page</h1>
            <SocialMediaLinks />
            <GuestBook />
            <CommentsSection />
        </div>
    );
}
