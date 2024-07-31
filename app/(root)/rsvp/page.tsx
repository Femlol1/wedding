import { RSVPForm } from "@/components/shared/RSVPForm";

const Rsvp: React.FC = () => {
  return (
    <div className="container mx-auto">
    <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
    <div className="wrapper h3-bold text-center">RSVP</div>
    </section>
    <div className="wrapper my-8 rsvp">
    <RSVPForm />
    </div>
    </div>
  );
};

export default Rsvp;