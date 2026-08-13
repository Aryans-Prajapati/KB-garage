import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ShieldCheck, Instagram, Facebook } from "lucide-react";

export function Footer() {
  const socialLinks = [
    { name: "Instagram", href: "https://www.instagram.com/kbgaragegota?igsh=MTBzNWJlYmh4aHRuZw==", icon: Instagram },
    { name: "Facebook", href: "https://www.facebook.com/share/19MzBynUWR/", icon: Facebook },
  ];

  return (
    <footer className="bg-primary text-slate-300 pt-10 pb-8 border-t border-slate-800">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800">
          {/* Brand Col */}
          <div className="space-y-3">
            <Link href="/" className="group flex items-center gap-3" aria-label="KB GARAGE Home">
              <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.svg"
                  alt="KB GARAGE Logo"
                  fill
                  className="object-contain drop-shadow-[0_4px_12px_rgba(212,175,55,0.4)]"
                />
              </div>
              <span className="font-heading text-xl md:text-2xl font-black tracking-tight text-white leading-none">
                KB <span className="gold-shine-text font-black tracking-widest">GARAGE</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Precision engineering, custom tuning, ceramic protection, and high-performance automotive maintenance tailored for enthusiasts across India.
            </p>
            <div className="flex items-center gap-2 text-tertiary text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Master Technicians</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
              Services & Booking
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services#ceramic" className="hover:text-secondary transition-colors">Ceramic Coating & PPF</Link>
              </li>
              <li>
                <Link href="/services#tuning" className="hover:text-secondary transition-colors">Performance ECU Tuning</Link>
              </li>
              <li>
                <Link href="/services#maintenance" className="hover:text-secondary transition-colors">Comprehensive Service</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-secondary transition-colors">Transformations Gallery</Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-secondary transition-colors font-semibold text-secondary">Book Appointment</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
              Contact & Location
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span>Near Seventh Parisar, Behind Jaguar Showroom, Sarkhej - Gandhinagar Highway, Gota, Ahmedabad, Gujarat 382481</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-secondary shrink-0" />
                <a href="tel:+917096777896" className="hover:text-secondary transition-colors">+91 70967 77896</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-secondary shrink-0" />
                <a href="mailto:Kbgarage46@gmail.com" className="hover:text-secondary transition-colors">Kbgarage46@gmail.com</a>
              </li>
            </ul>

            {/* Social Media Links */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">Follow Us</p>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow KB Garage on ${item.name}`}
                      className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-secondary hover:border-secondary/50 hover:bg-slate-800 transition-all duration-200"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} KB Garage. All rights reserved. Precision & Performance Design.</p>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/about" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-slate-400 transition-colors">Support</Link>
            <Link href="/admin" className="hover:text-secondary transition-colors font-semibold text-slate-300">Owner Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
