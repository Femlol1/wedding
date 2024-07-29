// pages/travel.js
import Head from 'next/head';
import Link from 'next/link';

export default function Travel() {
    return (
        <div className="container mx-auto px-4 py-8">
            <Head>
                <title>Travel and Accommodation</title>
            </Head>

            <h1 className="text-3xl font-bold text-center mb-6 mt-12">Travel & Accommodation</h1>
            
            <section className="mb-6">
    <h2 className="text-2xl font-semibold">Hotels</h2>
    <p className="mt-2">For your convenience, we have reserved a block of rooms at the following hotels. Please mention our wedding when booking to receive a special rate.</p>
    
    <div className="mt-4">
        <h3 className="text-xl font-semibold">Island - Hotel Vintanio</h3>
        <p>We have reserved Hotel Vintanio in Lekki for those seeking accommodation at N80,000 per night. Please contact the hotel manager at [phone number] to book a room at our discounted rate.</p>
        <p>More information: <Link href="https://vintanohotel.com/" legacyBehavior><a className="text-blue-500 hover:text-blue-700">Hotel Vintanio Website</a></Link></p>
    </div>
    
    <div className="mt-4">
        <h3 className="text-xl font-semibold">Mainland - Hotel [Hotel Name]</h3>
        <p>Description and details about the mainland hotel accommodation.</p>
        <p>Contact [phone number] for bookings.</p>
    </div>
</section>

<section>
    <h2 className="text-2xl font-semibold">Airbnb Options</h2>
    <p className="mt-2">There are also numerous Airbnb options available around the event locations. Here are links to Airbnb listings recommended for their quality and proximity to our wedding events:</p>
    <ul className="list-disc list-inside">
        <li><Link href="https://www.airbnb.com/s/Lagos--Nigeria/homes" legacyBehavior><a className="text-blue-500 hover:text-blue-700">Airbnbs near Lagos</a></Link></li>
    </ul>
</section>
        </div>
    );
}
