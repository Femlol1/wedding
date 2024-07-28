import Gallery from '@/components/shared/Gallery'; // Adjust import path if necessary

const GalleryPage = () => {
  return (
    <div className="container mx-auto mt-20">
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper h3-bold text-center">GALLERY</div>
      </section>
      <div className="wrapper my-8">
        <Gallery />
      </div>
    </div>
  );
};

export default GalleryPage;
