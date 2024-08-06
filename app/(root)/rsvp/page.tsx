import { RSVPForm } from "@/components/shared/RSVPForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

const Rsvp: React.FC = () => {
  return (
    <div className="container mx-auto mt-20">
    <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
    <div className="wrapper h3-bold text-center">RSVP</div>
    </section>
    <div className="wrapper my-8 rsvp">
    <RSVPForm />
    </div>
    <section className="fixed bottom-4 right-4 z-20">
        <Link href="/story">
          <Button className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
            <FiChevronRight className="text-6xl text-white" />
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Rsvp;