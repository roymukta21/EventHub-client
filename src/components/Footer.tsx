"use client";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";
import { SlSocialLinkedin } from "react-icons/sl";

const SOCIAL_LINKS = [
  { Icon: SiX, href: "https://twitter.com", label: "Twitter" },
  { Icon: SiFacebook, href: "https://facebook.com", label: "Facebook" },
  { Icon: SiInstagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: SlSocialLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: SiYoutube, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  const [hostname, setHostname] = useState("eventhub");
  const [year, setYear] = useState(2025);

  useEffect(() => {
    setHostname(window.location.hostname);
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">EventHub</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover, book, and experience the world&apos;s most extraordinary
              events. Your next great adventure is one click away.
            </p>
            <div className="flex gap-3 mt-4">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/explore", label: "Explore Events" },
                { to: "/about", label: "About Us" },
                { to: "/blog", label: "Blog" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    href={l.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {["Music","Technology","Sports","Arts","Food","Business","Health","Education"].map((c) => (
                <li key={c}>
                  <Link
                    href="/explore"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>123 Event Plaza, Suite 400</li>
              <li>New York, NY 10001</li>
              <li>
                <a href="tel:+15559876543" className="hover:text-primary transition-colors">
                  +1 (555) 987-6543
                </a>
              </li>
              <li>
                <a href="mailto:hello@eventhub.com" className="hover:text-primary transition-colors">
                  hello@eventhub.com
                </a>
              </li>
            </ul>
            <div className="mt-4 flex flex-col gap-1 text-xs text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>
            &copy; © {year}
            
          </p>
        </div>
      </div>
    </footer>
  );
}