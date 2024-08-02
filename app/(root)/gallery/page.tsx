// pages/gallery.js
import Countdown from '@/components/shared/Countdown'; // Import the Countdown component
import Gallery from '@/components/shared/Gallery'; // Adjust import path if necessary

const GalleryPage = () => {
  // Set your event date here
  const eventDate = "2025-03-20T11:00:00";

  return (
    <div className="container mx-auto mt-20">
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper h3-bold text-center">GALLERY</div>
      </section>
      <div className="wrapper my-8">
      <div className="text-center mb-4 text-xl font-semibold">Countdown to Our Wedding</div>
        <Countdown eventDate={eventDate} />  {/* Add the countdown component */}
        
        <Gallery />
        <div className="text-center mt-8 text-xl font-semibold">
          Thank you for visiting our wedding website. We look forward to celebrating with you!
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
