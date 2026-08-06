"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, PhoneCall, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Booking", href: "/booking" },
  { label: "Gallery", href: "/gallery" },
  { label: "About Us", href: "/about" },
  { label: "Blog & Reviews", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function TopNavBar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary/95 backdrop-blur-md shadow-lg py-3 border-b border-outline/20 text-white"
          : "bg-primary/90 backdrop-blur-md py-4 border-b border-outline/20 text-white"
      }`}
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="font-heading text-2xl md:text-3xl font-extrabold tracking-tighter text-white hover:text-secondary transition-colors flex items-center gap-2"
        >
          <span className="bg-secondary text-white px-2 py-0.5 rounded text-xl">KB</span>
          <span>GARAGE</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-sans text-xs uppercase tracking-widest font-semibold transition-all py-1 border-b-2 ${
                  isActive
                    ? "text-secondary border-secondary"
                    : "text-slate-300 border-transparent hover:text-white hover:border-slate-500"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link href="/booking" className="hidden sm:inline-block">
            <Button variant="primary" size="sm" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Book Now</span>
            </Button>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-primary border-t border-slate-800 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-semibold uppercase tracking-wider py-2 transition-colors ${
                    isActive ? "text-secondary font-bold" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <Link href="/booking" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Book Service Now</span>
              </Button>
            </Link>
            <a
              href="tel:+18005550199"
              className="flex items-center justify-center gap-2 text-xs font-semibold uppercase text-slate-400 hover:text-white py-2"
            >
              <PhoneCall className="w-4 h-4 text-secondary" />
              <span>24/7 Support: +1 (800) 555-0199</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
