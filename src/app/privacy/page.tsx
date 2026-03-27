import Footer from "@/components/Footer";

const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: "We collect information you provide directly, such as when you create an account, book an event, or contact us. This includes your name, email address, phone number, and payment information. We also collect information automatically, including your IP address, browser type, and usage patterns on our platform.",
  },
  {
    title: "2. How We Use Your Information",
    body: "We use your information to provide and improve our services, process bookings, send transactional emails, personalize your experience through AI recommendations, and communicate updates about events you're interested in. We never sell your personal data to third parties.",
  },
  {
    title: "3. Data Sharing",
    body: "We share information with event organizers as necessary to fulfill bookings, with payment processors to handle transactions, and with analytics providers to understand platform usage. All third-party partners are contractually obligated to protect your information.",
  },
  {
    title: "4. Data Security",
    body: "We use industry-standard encryption and security practices to protect your information. All payment data is processed through PCI-DSS compliant systems. We conduct regular security audits and maintain strict access controls.",
  },
  {
    title: "5. Your Rights",
    body: "You have the right to access, correct, or delete your personal information at any time. You can export your data, opt out of marketing communications, and request account deletion through your dashboard settings. For GDPR requests, contact privacy@eventhub.com.",
  },
  {
    title: "6. Cookies",
    body: "We use essential cookies to maintain your session and preferences, and optional analytics cookies to improve our platform. You can manage cookie preferences in your browser settings. Rejecting analytics cookies will not affect your ability to use EventHub.",
  },
];

export default function Privacy() {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-display font-bold mb-3">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: March 17, 2026
        </p>
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
