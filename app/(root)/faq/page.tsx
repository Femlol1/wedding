// pages/faq.js
import Collapsible from '@/components/shared/Collapsible';

export default function FAQ() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h1>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold">Contact Us</h2>
                <p>If you need to get in touch, please email us at [Your Email Address]. We would love to hear from you!</p>
                <p>If it’s regarding the vendors, please reach out to our wedding planner at Kahi Company (Ehi) - +234 808 091 8070.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold">Asoebi</h2>
                <Collapsible label="Where to get wedding clothes?">
                    <p>Application steps and details...</p>
                  </Collapsible>
                  <Collapsible label="How do I get a tailor to sew my clothes?">
                    <p>Application steps and details...</p>
                  </Collapsible>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">Travel Information</h2>
                <ul className="list-disc list-inside">
                  <Collapsible label="How do I apply for a Nigerian visa?">
                    <p>Application steps and details...</p>
                  </Collapsible>
                  <Collapsible label="How do I renew my Nigerian Passport?">
                    <p>Application steps and details...</p>
                  </Collapsible>
                  <Collapsible label="How can I get a Nigerian passport for the first time?">
                    <p>Application steps and details...</p>
                  </Collapsible>
                  <Collapsible label="How can I arrange airport pick up?">
                    <p>Application steps and details...</p>
                  </Collapsible>
                </ul>
            </section>
        </div>
    );
}
