"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, Calendar, ChevronDown, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    submenu: [
      { label: "Ceramic Coating", href: "/services#ceramic" },
      { label: "Paint Protection (PPF)", href: "/services#ppf" },
      { label: "Performance Tuning", href: "/services#tuning" },
      { label: "Precision Detailing", href: "/services#detailing" },
    ],
  },
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Detect scroll position for sticky navbar background transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/90 py-3 shadow-md shadow-slate-900/5 text-slate-900"
            : "bg-white/90 backdrop-blur-md border-b border-slate-200/60 py-4 shadow-sm text-slate-900"
          }`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2">

          {/* Logo - Far Left */}
          <div className="flex-initial flex justify-start items-center">
            <Link
              href="/"
              className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-lg"
              aria-label="KB GARAGE Home"
            >
              <div className="relative w-10 h-10 md:w-11 md:h-11 shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.svg"
                  alt="KB GARAGE Logo"
                  fill
                  className="object-contain drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)]"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg md:text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5 leading-none">
                  KB <span className="text-secondary font-black tracking-widest">GARAGE</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links - Shifted slightly left side */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center justify-start gap-1 xl:gap-2 flex-1 lg:pl-8 xl:pl-12"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              const hasSubmenu = Boolean(item.submenu);

              return (
                <div
                  key={item.label}
                  className="relative group py-2 px-1.5 xl:px-2"
                  onMouseEnter={() => hasSubmenu && setActiveDropdown(item.label)}
                  onMouseLeave={() => hasSubmenu && setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`relative inline-flex items-center gap-1 font-sans text-xs xl:text-sm uppercase tracking-wider font-semibold transition-colors duration-300 py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-secondary rounded ${isActive ? "text-secondary font-bold" : "text-slate-700 hover:text-slate-950"
                      }`}
                  >
                    <span>{item.label}</span>
                    {hasSubmenu && (
                      <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180 text-slate-500 group-hover:text-secondary" />
                    )}

                    {/* Hardware-accelerated left-to-right underline animation */}
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] w-full bg-secondary rounded-full transform origin-left transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                    />
                  </Link>

                  {/* Submenu Dropdown */}
                  {hasSubmenu && item.submenu && (
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${activeDropdown === item.label
                          ? "opacity-100 visible translate-y-0 scale-100"
                          : "opacity-0 invisible -translate-y-2 scale-95 pointer-events-none"
                        }`}
                    >
                      <div className="bg-white border border-slate-200/90 rounded-xl p-2 shadow-xl shadow-slate-900/10 flex flex-col space-y-0.5">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="group/sub relative py-2 px-3 transition-colors duration-200 rounded-lg hover:bg-transparent"
                          >
                            <span className="relative inline-block font-sans text-xs font-semibold uppercase tracking-wider text-slate-700 group-hover/sub:text-secondary transition-colors duration-300 pb-0.5">
                              {sub.label}
                              {/* Left-to-right underline animation */}
                              <span className="absolute bottom-0 left-0 h-[2px] w-full bg-secondary rounded-full transform origin-left transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] scale-x-0 group-hover/sub:scale-x-100" />
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA Button & Mobile Toggle - Far Right */}
          <div className="flex-initial flex justify-end items-center gap-3">
            <Link href="/booking" className="hidden sm:inline-flex">
              <Button
                variant="primary"
                size="sm"
                className="relative overflow-hidden group shadow-accent-glow hover:shadow-secondary/40 transition-all duration-300 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl bg-secondary hover:bg-secondary-dark text-on-secondary border border-secondary/30 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-on-secondary transition-transform duration-300 group-hover:scale-110" />
                <span>Book Now</span>
                <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              </Button>
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative p-2.5 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-200 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-secondary" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-screen / Slide-in Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop overlay */}
        <div
          className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Slide-in Menu Content */}
        <div
          className={`absolute top-0 right-0 w-full sm:w-80 h-full bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between p-6 pt-24 overflow-y-auto transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                Navigation Menu
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <div key={item.label} className="flex flex-col">
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`group flex items-center justify-between text-base font-semibold uppercase tracking-wider py-3 px-3 rounded-xl transition-all duration-200 ${isActive
                          ? "text-secondary bg-secondary/5 border-l-2 border-secondary font-bold"
                          : "text-slate-800 hover:text-secondary hover:bg-slate-50"
                        }`}
                    >
                      <span className="relative inline-block">
                        {item.label}
                        <span
                          className={`absolute bottom-0 left-0 h-[2px] w-full bg-secondary rounded-full transform origin-left transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                            }`}
                        />
                      </span>
                    </Link>

                    {/* Submenu links on mobile */}
                    {item.submenu && (
                      <div className="ml-4 pl-3 border-l border-slate-200 my-1 space-y-1">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="group/sub flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-secondary py-2 px-2 rounded-lg transition-colors"
                          >
                            <span className="relative inline-block">
                              {sub.label}
                              <span className="absolute bottom-0 left-0 h-[1.5px] w-full bg-secondary rounded-full transform origin-left transition-transform duration-300 scale-x-0 group-hover/sub:scale-x-100" />
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 space-y-4">
            <Link href="/booking" onClick={() => setMobileMenuOpen(false)} className="block">
              <Button
                variant="primary"
                size="md"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary hover:bg-secondary-dark text-on-secondary font-semibold uppercase tracking-wider shadow-accent-glow"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Service Now</span>
              </Button>
            </Link>

            <a
              href="tel:+18005550199"
              className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-900 py-2 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-secondary" />
              <span>24/7 Support: +1 (800) 555-0199</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}




