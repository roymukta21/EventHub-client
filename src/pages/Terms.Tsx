import Footer from "../components/Footer";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using EventHub, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our platform.",
  },
  {
    title: "2. User Accounts",
    body: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must be at least 18 years old to create an account and book events.",
  },
  {
    title: "3. Booking and Payments",
    body: "When you book an event, you enter into a contract with the event organizer. EventHub facilitates this transaction but is not a party to it. All prices are displayed in USD. Payment is processed securely through our payment partners.",
  },
  {
    title: "4. Cancellations and Refunds",
    body: "Refund policies are set by individual event organizers. As a general rule, full refunds are available up to 48 hours before the event. After this time, you may be offered a credit or ticket transfer. EventHub processing fees are non-refundable.",
  },
  {
    title: "5. Prohibited Conduct",
    body: "You agree not to engage in fraud, resell tickets above face value, create fake accounts, post false reviews, or interfere with the platform's operation. Violations may result in account termination and legal action.",
  },
  {
    title: "6. Limitation of Liability",
    body: "EventHub is not liable for events that are cancelled, postponed, or fail to meet expectations. Our liability is limited to the ticket purchase price. We strongly recommend purchasing event insurance for high-value bookings.",
  },
];

export default function Terms() {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-display font-bold mb-3">
          Terms of Service
        </h1>
        <p className="text-muted-foreground mb-8">Effective: March 17, 2026</p>
        {SECTIONS.map((s) => (
          <div key={s.title} className="mb-8">
            <h2 className="text-xl font-display font-semibold mb-3">
              {s.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
