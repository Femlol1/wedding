// pages/faq.js
import Collapsible from '@/components/shared/Collapsible';

export default function FAQ() {
    return (
        <div className="container mx-auto px-4 py-8 mt-20">
            <h1 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h1>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold">Contact Us</h2>
                <p>If you need to get in touch, please email us at [Your Email Address]. We would love to hear from you!</p>
                <p>If it’s regarding the vendors, please reach out to our wedding planner at Kahi Company (Ehi) - +234 808 091 8070.</p>
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
                    <p>To apply for a Nigerian visa, visit the official Nigerian immigration website and follow the application instructions.</p>
                </Collapsible>
                <Collapsible label="How do I renew my Nigerian Passport?">
                    <p>To renew your Nigerian passport, visit the official Nigerian immigration website and follow the renewal instructions.</p>
                </Collapsible>
                <Collapsible label="How can I get a Nigerian passport for the first time?">
                    <p>To get a Nigerian passport for the first time, visit the official Nigerian immigration website and follow the application instructions for a new passport.</p>
                </Collapsible>
                <Collapsible label="How can I arrange airport pick up?">
                    <p>Please contact our wedding planner to arrange airport pickup. Provide your flight details and arrival time for coordination.</p>
                </Collapsible>
            </section>
        </div>
    );
}
