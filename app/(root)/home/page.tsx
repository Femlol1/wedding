"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import 'react-responsive-carousel/lib/styles/carousel.min.css';

const HomePage: React.FC = () => {
  

  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-3xl font-bold text-center mt-8">Welcome to Our Wedding Website</h1>
      <h5 className="text-xl font-bold text-center mt-3">{`Thank you for sharing this special moment with us!`}</h5>
      <p className="text-center mt-4">
        We are overjoyed to announce our wedding and delighted to share this special journey with our cherished friends and family.
        This website is your one-stop destination for all the details you need to celebrate our big day with us.
        <br /><br />
        <strong>Tolu and Ope Forever #TOforever</strong>
      </p>
      <div className="text-center mt-8">
      <AlertDialog>
          <AlertDialogTrigger className="inline-block px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
            Dress Code
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-bold">Wedding Information</AlertDialogTitle>
              <AlertDialogDescription className="text-left mt-4">
                <p><strong>Wedding colours: Emerald or Chocolate</strong></p>
                <p className="mt-4">Please kindly let us know if you are interested in participating in ASO EBI (TRADITIONAL ATTIRE). Information is as follows:</p>
                <p className="mt-2"><strong>For Brides Family Asoebi contact - Pelumi Osibemekun</strong></p>
                <p className="mt-2"><strong>For Grooms family Asoebi contact - Funke Oyediran</strong></p>
                <p className="mt-4"><strong>Cost estimates:</strong></p>
                <p className="mt-2"><strong>USA</strong></p>
                <ul className="list-disc list-inside">
                  <li>Women - $200 Complete set including Lace, Aso Oke, Gele & Ipele</li>
                  <li>Men - $150 Complete set</li>
                  <li>Gele & Ipele - $70</li>
                  <li>Cap only - $25</li>
                </ul>
                <p className="mt-2"><strong>UK</strong></p>
                <p className="mt-2"><strong>Nigeria</strong></p>
                <p className="mt-4"><strong>Payment:</strong></p>
                <ul className="list-disc list-inside">
                  <li>USA - </li>
                  <li>UK - </li>
                  <li>
                    Nigeria - Zelle Ibironke Smith-Adebanjo 321-228-1743
                    <br />*Bank transfer* Ibironke Smith-Adebanjo Chase Bank Routing # 267084131 Account # 436803550
                  </li>
                </ul>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700 transition-colors duration-200">Cancel</AlertDialogCancel>
              <AlertDialogAction className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition-colors duration-200">Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default HomePage;
