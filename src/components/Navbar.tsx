"use client";
import {  useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
//import { useTheme } from "next-themes";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  //const { theme, toggleTheme } = themeContext(); 
  const pathname = usePathname();

  
  useEffect(() => {
    const handleScroll = () => {
      
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "border-b border-border/40 bg-background/80 backdrop-blur-md py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <Calendar className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className={`font-bold text-xl ${!scrolled && "text-foreground"}`}>
              EventHub
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {["Home", "Explore", "About", "Blog"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  scrolled ? "text-foreground/80" : "text-foreground"
                }`}
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </Button>

            <Link href="/login">
              <Button 
                variant={scrolled ? "default" : "outline"} 
                className="transition-all duration-300"
              >
                Login
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-background border-b md:hidden"
          >
            <div className="p-4 space-y-4">
             
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}