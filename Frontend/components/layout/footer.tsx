import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-primary text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="group flex items-center gap-3" aria-label="KB GARAGE Home">
              <div className="relative w-14 h-14 md:w-16 md:h-16 shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.svg"
                  alt="KB GARAGE Logo"
                  fill
                  className="object-contain drop-shadow-[0_4px_12px_rgba(212,175,55,0.4)]"
                />
              </div>
              <span className="font-heading text-2xl md:text-3xl font-black tracking-tight text-white leading-none">
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
          <div className="space-y-4">
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
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
              Contact & Location
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span>Apex Motors Complex, WE Highway, Andheri East, Mumbai, Maharashtra 400069</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-secondary shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-secondary shrink-0" />
                <span>service@kbgarage.in</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
              Operating Hours
            </h4>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span>Mon – Fri:</span>
                <span className="text-white font-medium">8:00 AM – 6:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span>Saturday:</span>
                <span className="text-white font-medium">9:00 AM – 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-secondary font-medium">Emergency Only</span>
              </div>
            </div>
            <Link href="/booking">
              <Button variant="primary" size="sm" className="w-full mt-2 flex items-center justify-center gap-2">
                <span>Reserve Slot</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Copyright Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} KB Garage. All rights reserved. Precision & Performance Design.</p>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/about" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-slate-400 transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
