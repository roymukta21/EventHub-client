"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle,
  Dumbbell,
  Heart,
  Mail,
  Monitor,
  Music,
  Palette,
  Star,
  Utensils,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";
import { blogPosts } from "../data/blog";
import { events } from "../data/events";

const CATEGORIES = [
  {
    name: "Music",
    icon: Music,
    color:
      "bg-pink-500/10 text-pink-600 dark:text-pink-400 hover:bg-pink-500/20",
  },
  {
    name: "Technology",
    icon: Monitor,
    color:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20",
  },
  {
    name: "Sports",
    icon: Dumbbell,
    color:
      "bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20",
  },
  {
    name: "Arts",
    icon: Palette,
    color:
      "bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20",
  },
  {
    name: "Food",
    icon: Utensils,
    color:
      "bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20",
  },
  {
    name: "Business",
    icon: Briefcase,
    color:
      "bg-slate-500/10 text-slate-600 dark:text-slate-400 hover:bg-slate-500/20",
  },
  {
    name: "Health",
    icon: Heart,
    color:
      "bg-teal-500/10 text-teal-600 dark:text-teal-400 hover:bg-teal-500/20",
  },
  {
    name: "Education",
    icon: BookOpen,
    color:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20",
  },
];

const STATS = [
  { value: 10000, suffix: "+", label: "Events Listed" },
  { value: 50000, suffix: "+", label: "Happy Attendees" },
  { value: 500, suffix: "+", label: "Organizers" },
  { value: 4.8, suffix: "", label: "Avg Rating" },
];

const TESTIMONIALS = [
  {
    name: "Sophie Williams",
    role: "Event Enthusiast",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
    rating: 5,
    text: "EventHub completely transformed how I discover events in my city. I've attended 12 events this year that I never would have found otherwise!",
  },
  {
    name: "Ryan Torres",
    role: "Tech Professional",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan",
    rating: 5,
    text: "The AI recommendations are eerily accurate. It suggested a jazz evening that became my new Friday ritual. The booking experience is flawless.",
  },
  {
    name: "Aisha Okonkwo",
    role: "Food Blogger",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
    rating: 5,
    text: "As a food blogger, I live on EventHub for finding culinary events. The detailed descriptions and photos help me choose exactly the right experience.",
  },
];

const FAQS = [
  {
    q: "How do I book an event?",
    a: "Browse our explore page, find an event you love, click 'View Details', then 'Book Now'. Create an account if you haven't already and follow the booking steps.",
  },
  {
    q: "Can I get a refund if I can't attend?",
    a: "Yes! We offer full refunds up to 48 hours before the event. After that, you may transfer your ticket to someone else or receive a credit for future bookings.",
  },
  {
    q: "How does the AI recommendation system work?",
    a: "Our EventAI analyzes your browsing history, booking patterns, and stated preferences to surface events you're most likely to love — updated in real time.",
  },
  {
    q: "How can I list my event on EventHub?",
    a: "Create an organizer account, go to your dashboard, and click 'Add Event'. Our team reviews submissions within 24 hours and can help optimize your listing.",
  },
  {
    q: "Are there group booking discounts?",
    a: "Many organizers offer group rates for 10+ tickets. Look for the group discount badge on event listings, or contact the organizer directly through the event page.",
  },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-4xl font-display font-bold text-primary">
      {Number.isInteger(target) ? count.toLocaleString() : count.toFixed(1)}
      {suffix}
    </div>
  );
}

export default function Landing() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState("");
  const featured = events.filter((e) => e.isFeatured);
  const latestBlogs = blogPosts.slice(0, 3);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setEmailError("Please enter a valid email");
      return;
    }
    setEmailError("");
    setSubscribed(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[65vh] flex items-center overflow-hidden hero-gradient">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <span>✨</span> Discover extraordinary experiences
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
                Find Events
                <br />
                <span className="gradient-text">You'll Love</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
                Your AI-powered gateway to the world's most incredible events.
                From intimate jazz evenings to massive tech summits.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/explore">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 rounded-xl text-base px-8"
                    data-ocid="landing.explore_button"
                  >
                    Explore Events <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 rounded-xl text-base px-8 border-2"
                    data-ocid="landing.create_button"
                  >
                    Create Event
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div className="flex -space-x-2">
                  {["A", "B", "C", "D"].map((l) => (
                    <div
                      key={l}
                      className="w-8 h-8 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-xs font-bold text-primary"
                    >
                      {l}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">50,000+</strong> attendees
                  trust EventHub
                </p>
              </div>
            </div>
            {/* Floating cards */}
            <div className="hidden lg:flex relative h-80 items-center justify-center">
              <div className="absolute top-0 right-8 animate-float">
                <div className="bg-card border border-border rounded-2xl p-4 shadow-lg w-52">
                  <img
                    src={events[0].imageUrl}
                    className="w-full h-24 object-cover rounded-lg mb-2"
                    alt=""
                  />
                  <p className="font-semibold text-xs truncate">
                    {events[0].title}
                  </p>
                  <p className="text-primary text-xs font-bold">
                    ${events[0].price}
                  </p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 animate-float-delay">
                <div className="bg-card border border-border rounded-2xl p-4 shadow-lg w-44">
                  <img
                    src={events[1].imageUrl}
                    className="w-full h-20 object-cover rounded-lg mb-2"
                    alt=""
                  />
                  <p className="font-semibold text-xs truncate">
                    {events[1].title}
                  </p>
                  <p className="text-primary text-xs font-bold">
                    ${events[1].price}
                  </p>
                </div>
              </div>
              <div
                className="absolute top-16 left-16 animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="bg-card border border-border rounded-2xl p-4 shadow-lg w-40">
                  <img
                    src={events[2].imageUrl}
                    className="w-full h-16 object-cover rounded-lg mb-2"
                    alt=""
                  />
                  <p className="font-semibold text-xs truncate">
                    {events[2].title}
                  </p>
                  <p className="text-green-500 text-xs font-bold">
                    ${events[2].price}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              Why EventHub?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to discover, book, and experience
              extraordinary events.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🔍",
                title: "Discover Events",
                desc: "AI-powered search surfaces events perfectly matched to your interests, location, and schedule.",
              },
              {
                icon: "⚡",
                title: "Easy Booking",
                desc: "Book tickets in seconds with our seamless checkout. Multiple payment options, instant confirmation.",
              },
              {
                icon: "🤖",
                title: "AI Recommendations",
                desc: "Our EventAI learns your preferences and suggests events you'll genuinely love before you even search.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-card border border-border rounded-2xl p-6 card-hover"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              Browse by Category
            </h2>
            <p className="text-muted-foreground">
              Find exactly the kind of experience you're looking for.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link key={cat.name} to="/explore">
                <div
                  className={`rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer hover:scale-105 ${cat.color} border border-transparent hover:border-current/20`}
                  data-ocid={`landing.category_${cat.name.toLowerCase()}_button`}
                >
                  <cat.icon className="w-8 h-8 mx-auto mb-3" />
                  <p className="font-display font-semibold text-sm">
                    {cat.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Events */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-2">
                Popular Events
              </h2>
              <p className="text-muted-foreground">
                Hand-picked events loved by our community.
              </p>
            </div>
            <Link to="/explore">
              <Button
                variant="outline"
                className="gap-2"
                data-ocid="landing.view_all_button"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((ev, i) => (
              <EventCard key={ev.id} event={ev} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATS.map((s) => (
              <div key={s.label} className="p-6">
                <Counter target={s.value} suffix={s.suffix} />
                <p className="text-muted-foreground mt-2 font-medium">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              Three simple steps to your next unforgettable experience.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
              {
                step: "1",
                title: "Discover",
                desc: "Browse thousands of events or let our AI find the perfect ones based on your interests.",
              },
              {
                step: "2",
                title: "Book",
                desc: "Reserve your spot in seconds with our seamless, secure booking process.",
              },
              {
                step: "3",
                title: "Experience",
                desc: "Show up, enjoy, and share your experience. Collect memories, not just tickets.",
              },
            ].map((s) => (
              <div key={s.step} className="text-center relative">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-display font-bold mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-display font-semibold text-xl mb-2">
                  {s.title}
                </h3>
                <p className="text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              What People Say
            </h2>
            <p className="text-muted-foreground">
              Join thousands of event-goers who trust EventHub.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-card border border-border rounded-2xl p-6 card-hover"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-2">
                From the Blog
              </h2>
              <p className="text-muted-foreground">
                Insights, guides, and stories about events and experiences.
              </p>
            </div>
            <Link to="/blog">
              <Button variant="outline" className="gap-2">
                All Posts <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {latestBlogs.map((post, i) => (
              <Link
                key={post.id}
                to="/blog/$id"
                params={{ id: String(post.id) }}
              >
                <div
                  className="bg-card border border-border rounded-2xl overflow-hidden card-hover h-full flex flex-col"
                  data-ocid={`landing.blog_card.${i + 1}`}
                >
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-xs text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded-full w-fit mb-3">
                      {post.category}
                    </span>
                    <h3 className="font-display font-semibold text-base line-clamp-2 mb-2 flex-1">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                      <span>{post.author}</span>
                      <span>·</span>
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-2xl px-5 data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="text-sm font-semibold text-left hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-display font-bold mb-3">
            Stay in the Loop
          </h2>
          <p className="text-muted-foreground mb-8">
            Get weekly event recommendations delivered straight to your inbox.
            No spam, ever.
          </p>
          {subscribed ? (
            <div
              className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-2xl p-4"
              data-ocid="newsletter.success_state"
            >
              <CheckCircle className="w-5 h-5" /> You're subscribed! Welcome to
              the community.
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex gap-2 max-w-sm mx-auto"
            >
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl"
                  data-ocid="newsletter.input"
                />
                {emailError && (
                  <p className="text-destructive text-xs mt-1 text-left">
                    {emailError}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="bg-primary text-primary-foreground rounded-xl"
                data-ocid="newsletter.submit_button"
              >
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-3xl p-12 text-center text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Ready to Find Your Next Adventure?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
                Join 50,000+ event-goers who have already discovered their
                favorite experiences through EventHub.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/explore">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 rounded-xl font-semibold"
                    data-ocid="landing.cta_explore_button"
                  >
                    Browse Events
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/50 text-white hover:bg-white/10 rounded-xl"
                    data-ocid="landing.cta_signup_button"
                  >
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
