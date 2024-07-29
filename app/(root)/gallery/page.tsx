import Countdown from '@/components/shared/Countdown'; // Import the Countdown component
import Gallery from '@/components/shared/Gallery'; // Adjust import path if necessary

const GalleryPage = () => {
  // Set your event date here
  const eventDate = "2025-03-22T11:00:00";

  return (
    <div className="container mx-auto">
     
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper h3-bold text-center">GALLERY</div>
      </section>
      <div className="wrapper my-8">
      <Countdown eventDate={eventDate} />  {/* Add the countdown component */}
        <Gallery />
      </div>
    </div>
  );
};

export default GalleryPage;