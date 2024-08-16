// pages/travel.js
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

export default function Travel() {
    return (
        <div className="flex flex-col min-h-screen md:mt-20">
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
                        <h3 className="text-3xl md:text-5xl font-bold mt-2">Lagos</h3>
                    </div>
                </section>
                <div className="container mx-auto px-4 py-8">
                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold">Hotels recommendations</h2>
                        <p className="mt-2">For your convenience, we have reserved a block of rooms at the following hotels. Please mention our wedding when booking to receive a special rate.</p>
                        
                        <div className="mt-4 flex flex-col md:flex-row items-center md:items-start gap-4">
                            <Image
                                src="/assets/images/Travel/Reception.webp" // Replace with the actual image path
                                alt="Hotel Vintanio"
                                width={300}
                                height={200}
                                className="rounded-lg w-full md:w-1/3 object-cover"
                            />
                            <div className="md:w-2/3">
                                <h3 className="text-xl font-semibold">Hotel Vintanio</h3>
                                <p>We have reserved Hotel Vintanio in Lekki for those seeking accommodation at N80,000 per night. Please contact the hotel manager at <span className='text-primary'>+234(0)813508382</span> to book a room at our discounted rate.</p>
                                <p>More information: <Link href="https://vintanohotel.com/" legacyBehavior><a className="text-primary hover:text-primary-700">Hotel Vintanio Website</a></Link></p>
                            </div>
                        </div>
                        
                        {/* <div className="mt-4 flex flex-col md:flex-row items-center md:items-start gap-4">
                            <Image
                                src="/assets/images/hotel-mainland.jpg" // Replace with the actual image path
                                alt="Hotel Mainland"
                                width={300}
                                height={200}
                                className="rounded-lg w-full md:w-1/3 object-cover"
                            />
                            <div className="md:w-2/3">
                                <h3 className="text-xl font-semibold">Mainland - Hotel [Hotel Name]</h3>
                                <p>Description and details about the mainland hotel accommodation.</p>
                                <p>Contact [phone number] for bookings.</p>
                            </div>
                        </div> */}
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold">Airbnb Options</h2>
                        <p className="mt-2">There are also numerous Airbnb options available around the event locations. Here are links to Airbnb listings recommended for their quality and proximity to our wedding events:</p>
                        <ul className="list-disc list-inside">
                            <li><Link href="https://www.airbnb.com/s/Lagos--Nigeria/homes" legacyBehavior><a className="text-primary hover:text-primary-700">Airbnbs near Lagos</a></Link></li>
                        </ul>
                    </section>

                    <section className="fixed bottom-4 right-4 z-20">
                        <Link href="/faq">
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
