// pages/gifts.js

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

const Gifts = () => {
  return (
    <div className="flex flex-col md:flex-col md:mt-20">
      
        {/* Image Section */}
        <section className="relative w-full h-64 ">
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
            <h3 className="text-3xl md:text-5xl font-bold mt-2">Gifts</h3>
          </div>
        </section>
    <div className="container mx-auto px-4 py-4">
      <p className="mt-4 text-lg text-center">
        Your presence at our wedding is the greatest gift we could ask for. If you would like to
        contribute further, a cash gift towards our honeymoon or our new home would be greatly appreciated.
        Thank you for your love and support.
      </p>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold">Bank Details</h2>
        <div className="mt-4 space-y-3">
          <div>
            <h3 className="font-semibold"><span className="inline-block">
                <Image
                src="/assets/icons/usa.png" // Replace with your image path
                alt="isa logo"
                width={10}
                height={10}
                className=" pb-0.5 flex-shrink-0 transition-transform duration-300 transform hover:scale-110"></Image></span> United States</h3>
                <p>Bank of America<br />
            Name on the account: Toluwanimi Oyediran <br />
            Account number: 446055799865 <br /><br />
            For Zele: toluoyed26@gmail.com</p>
          </div>
          <div>
            <h3 className="font-semibold"><span className="inline-block">
                <Image
                src="/assets/icons/united-kingdom.png" // Replace with your image path
                alt="isa logo"
                width={10}
                height={10}
                className="pb-0.5 flex-shrink-0 transition-transform duration-300 transform hover:scale-110"></Image></span> United Kingdom 
              </h3>
            <p>Name on the account: Ope Osibemekun <br />
                Sort code: 60-84-07 <br />
            Account number: 81453566</p>
          </div>
          <div>
            <h3 className="font-semibold"><span className="inline-block">
                <Image
                src="/assets/icons/nigeria.png" // Replace with your image path
                alt="isa logo"
                width={10}
                height={10}
                className="pb-0.4 flex-shrink-0 transition-transform duration-300 transform hover:scale-110"></Image></span> Nigeria</h3>
            <p>Name on the account: OSIBEMEKUN OPEOLUWA EFUNYINKA <br />
            Account number:  0170585078</p>
          </div>
        </div>

        <h2 className="mt-8 text-2xl font-semibold">PayPal</h2>
        <p className="mt-4">For convenience, you can also use <Link className="text-primary underline " href={"https://www.paypal.me/OpeOsibemekun"}>PayPal</Link> .</p>
        
      </div>
      <section className="fixed bottom-4 right-4 z-20">
        <Link href="/guest">
        <Button className="w-12 h-12 text-white btn-fill font-bold py-2 px-3 rounded-full transition duration-200 flex items-center justify-center shadow-lg">
                  <FiChevronRight className="text-2xl text-white" />
                </Button>
        </Link>
      </section>
    </div>
    </div>
  
  );
}

export default Gifts;
