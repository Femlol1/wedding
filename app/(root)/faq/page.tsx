// pages/faq.js
import Collapsible from '@/components/shared/Collapsible';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

export default function FAQ() {
    return (
        <div className="flex flex-col min-h-screen md:mt-20">
        <div className="flex flex-col md:flex-row flex-grow">
          {/* Image Section */}
          <section className="relative w-full md:w-1/2 h-64 md:h-auto">
            <Image
              src="/assets/images/Faq/FaqHeader.jpg" // Replace with your image path
              alt="Welcome Image"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
              className="z-0"
            />
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20">
              <h3 className="text-3xl md:text-5xl font-bold mt-2">Frequently Asked Questions</h3>
            </div>
          </section>
        <div className="container mx-auto px-4 py-8">

            <section className="mb-6">
                <h2 className="text-2xl font-semibold">Contact Us</h2>
                <p>If you need to get in touch, please email us at femi@toluandope.com. We would love to hear from you!</p>
                <p>If it’s regarding the vendors, please reach out to our wedding planner at Kahi Company (Ehi) - <span className='text-primary-500 hover:text-primary-700'><a href={`tel:${`+2348080918070`}`}>+234(0)808 091 8070</a></span> . </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold">General Questions</h2>
                <Collapsible label="Can I bring a plus one?">
                    <p>No, our wedding is by invite only. No extra guests unless approved by us to maintain a safe, intimate celebration.</p>
                </Collapsible>
                <Collapsible label="Can I bring kids to the Wedding?">
                    <p>We kindly request that you do not bring kids to the wedding to ensure a smooth and enjoyable experience for all guests.</p>
                </Collapsible>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold">Asoebi</h2>
                <Collapsible label="Where to get wedding clothes?">
                    <p>You can get your wedding clothes from the recommended vendors. Please contact our wedding planner for more details.</p>
                </Collapsible>
                <Collapsible label="How do I get a tailor to sew my clothes?">
                    <p>We have a list of recommended tailors. Please contact our wedding planner for more details.</p>
                </Collapsible>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">Travel Information</h2>
                <Collapsible label="How do I apply for a Nigerian visa?">
                    <p>To apply for a Nigerian visa, visit the official <Link className='text-primary-500 hover:text-primary-700 underline' href={"https://immigration.gov.ng/"}>Nigerian immigration website</Link> and follow the application instructions.</p>
                </Collapsible>
                <Collapsible label="How do I renew my Nigerian Passport?">
                    <p>To renew your Nigerian passport, visit the official <Link className='text-primary-500 hover:text-primary-700 underline' href={"https://immigration.gov.ng/"}>Nigerian immigration website</Link> and follow the renewal instructions.</p>
                </Collapsible>
                <Collapsible label="How can I get a Nigerian passport for the first time?">
                    <p>To get a Nigerian passport for the first time, visit the official <Link className='text-primary-500 hover:text-primary-700 underline' href={"https://immigration.gov.ng/"}>Nigerian immigration website</Link> and follow the application instructions for a new passport.</p>
                </Collapsible>
                <Collapsible label="How can I arrange airport pick up?">
                    <p>Please contact our wedding planner to arrange airport pickup. Provide your flight details and arrival time for coordination.</p>
                </Collapsible>
            </section>
            <section className="fixed bottom-4 right-4 z-20">
              <Link href="/home">
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
