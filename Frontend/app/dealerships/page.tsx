"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Sparkles,
  ShieldCheck,
  Check,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Star,
  Wrench,
  Award,
  Clock,
  Car
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Dealership {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  phone: string;
  email: string;
  location: string;
  description: string;
  highlights: string[];
  stats: { label: string; value: string }[];
  isFirstInIndia?: boolean;
}

const DEALERSHIPS: Dealership[] = [
  {
    id: "petronas",
    name: "Petronas AutoExpert @ KB Garage",
    badge: "1st in India",
    tagline: "Formula 1™ Grade Lubricants & Engine Thermal Engineering",
    phone: "+91 70967 77896",
    email: "info@kbgarage.in",
    location: "KB Garage Flagship Studio, Gota, Ahmedabad",
    description:
      "KB Garage is proud to host India's 1st exclusive Petronas AutoExpert service hub. Powered by PETRONAS Syntium with CoolTech™ technology proven in Mercedes-AMG PETRONAS Formula One racing engines, we deliver ultimate engine thermal management, high-performance fluid flushes, and master oiling diagnostics.",
    highlights: [
      "1st & Exclusive Petronas AutoExpert Hub in India at KB Garage",
      "PETRONAS Syntium with CoolTech™ F1-tested synthetic formula",
      "Fluid Technology Solutions™ (FTS) & complete engine flush",
      "Certified master lubricant diagnostics & performance oiling"
    ],
    stats: [
      { label: "India Rank", value: "#1 First Hub" },
      { label: "Technology", value: "F1™ CoolTech" },
      { label: "Grade", value: "100% OEM Synthetic" }
    ],
    isFirstInIndia: true
  },
  {
    id: "indomotive",
    name: "Indomotive Auto Garage @ KB Garage",
    badge: "Authorized Franchise Hub",
    tagline: "Organized Multi-Brand Automotive Service & Detailing Blueprint",
    phone: "+91 70967 77896",
    email: "info@kbgarage.in",
    location: "KB Garage Flagship Studio, Gota, Ahmedabad",
    description:
      "Authorized Indomotive hub at KB Garage bringing organized multi-brand garage expertise. Equipping our studio with standardized car detailing bays, precision ceramic coating, periodic maintenance, and cashless insurance accidental restoration.",
    highlights: [
      "Multi-brand car spa & paint correction technology",
      "Full periodic maintenance & mechanical diagnostics",
      "Cashless insurance accident restoration network",
      "Standardized urban express detailing & garage service blueprint"
    ],
    stats: [
      { label: "Service Model", value: "Multi-Brand" },
      { label: "Detailing", value: "Precision Bay" },
      { label: "Insurance", value: "Cashless Partner" }
    ]
  },
  {
    id: "spinoto",
    name: "Spinoto Mobile Care @ KB Garage",
    badge: "Doorstep On-Demand",
    tagline: "KB Garage Doorstep Mechanics & Mobile Car Care Service",
    phone: "+91 70967 77896",
    email: "info@kbgarage.in",
    location: "Doorstep Service across Ahmedabad & Metro Hubs",
    description:
      "KB Garage's Spinoto mobile service division brings doorstep vehicle care directly to your home or office. Dispatching verified mobile mechanics in minutes, providing transparent digital quotes, express car wash pickup-drop, and 24/7 roadside assistance.",
    highlights: [
      "Verified doorstep mechanics at your home or office in minutes",
      "Instant transparent digital quotes & service tracking",
      "4-Wheeler car wash & interior car spa pickup-drop service",
      "Emergency roadside breakdown assistance & mobile battery care"
    ],
    stats: [
      { label: "Response Time", value: "< 30 Mins" },
      { label: "Service Model", value: "Doorstep Mobile" },
      { label: "Booking", value: "Online / App" }
    ]
  }
];

export default function DealershipsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredDealerships =
    activeFilter === "all"
      ? DEALERSHIPS
      : DEALERSHIPS.filter((d) => d.id === activeFilter);

  return (
    <div className="pb-16 space-y-16">
      {/* Header Banner Section - KB Garage Yellow/Gold Theme */}
      <section className="bg-primary text-white py-16 px-margin-mobile md:px-margin-desktop text-center relative overflow-hidden">
        <div className="max-w-container-max mx-auto space-y-4 relative z-10">
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white">
            Authorized <span className="gold-shine-text">Dealerships</span>
          </h1>

          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg font-sans">
            KB Garage official dealership partnerships bringing Formula 1™ grade fluid engineering, multi-brand garage blueprints, and doorstep mobile vehicle care under one roof.
          </p>
        </div>
      </section>


      {/* Filter Navigation Tabs - Yellow/Gold Accent */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-semibold uppercase tracking-wider transition-all duration-200 ${
              activeFilter === "all"
                ? "bg-secondary text-on-secondary font-bold shadow-md shadow-secondary/20"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All Divisions (3)
          </button>
          <button
            onClick={() => setActiveFilter("petronas")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
              activeFilter === "petronas"
                ? "bg-secondary text-on-secondary font-bold shadow-md shadow-secondary/20"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Petronas (1st in India)
          </button>
          <button
            onClick={() => setActiveFilter("indomotive")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-semibold uppercase tracking-wider transition-all duration-200 ${
              activeFilter === "indomotive"
                ? "bg-secondary text-on-secondary font-bold shadow-md shadow-secondary/20"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Indomotive
          </button>
          <button
            onClick={() => setActiveFilter("spinoto")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-semibold uppercase tracking-wider transition-all duration-200 ${
              activeFilter === "spinoto"
                ? "bg-secondary text-on-secondary font-bold shadow-md shadow-secondary/20"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Spinoto Mobile
          </button>
        </div>
      </section>

      {/* Dealership Cards List - Standard Theme Formatting */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop space-y-10">
        {filteredDealerships.map((dealership) => (
          <Card
            key={dealership.id}
            id={dealership.id}
            className="overflow-hidden border border-slate-200/90 bg-white text-slate-900 shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* Top Yellow Gold Accent Line */}
            <div className="h-1.5 w-full bg-secondary" />

            <CardHeader className="p-6 sm:p-8 space-y-3">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="space-y-1">
                  <span className="font-mono text-xs uppercase tracking-widest text-secondary font-bold">
                    KB Garage Official Partner Division
                  </span>

                  <CardTitle className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
                    {dealership.name}
                  </CardTitle>

                  <CardDescription className="text-sm italic font-medium text-slate-600 font-sans">
                    "{dealership.tagline}"
                  </CardDescription>
                </div>

                {/* Badge - Yellow Gold Palette */}
                <div>
                  {dealership.isFirstInIndia ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold font-mono bg-secondary/15 text-slate-900 border border-secondary/40 shadow-sm">
                      <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
                      {dealership.badge}
                    </span>
                  ) : (
                    <Badge variant="secondary" className="text-xs font-mono py-1 px-3 bg-secondary/10 text-slate-900 border border-secondary/30">
                      {dealership.badge}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-6 sm:px-8 space-y-6">
              {/* Description */}
              <p className="text-sm sm:text-base leading-relaxed text-slate-700 font-sans">
                {dealership.description}
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {dealership.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl text-center border bg-slate-50 border-slate-200/80 text-slate-900"
                  >
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-0.5">
                      {stat.label}
                    </div>
                    <div className="text-sm font-heading font-bold text-slate-900">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Capabilities Checklist */}
              <div className="space-y-3 pt-1">
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-800">
                  Key Division Offerings:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {dealership.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                      <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <span className="text-slate-700 font-sans">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location & Contact Info Bar */}
              <div className="p-4 rounded-xl border bg-slate-50 border-slate-200/80 text-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-secondary shrink-0" />
                  <span className="font-sans font-medium">{dealership.location}</span>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <a href={`tel:${dealership.phone.replace(/\s+/g, '')}`} className="flex items-center gap-1.5 hover:text-secondary transition-colors font-mono">
                    <Phone className="w-3.5 h-3.5 text-secondary" />
                    <span>{dealership.phone}</span>
                  </a>
                  <a href={`mailto:${dealership.email}`} className="flex items-center gap-1.5 hover:text-secondary transition-colors font-mono">
                    <Mail className="w-3.5 h-3.5 text-secondary" />
                    <span>{dealership.email}</span>
                  </a>
                </div>
              </div>
            </CardContent>

            <CardFooter className="px-6 sm:px-8 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end">
              <Link href="/booking">
                <Button
                  variant="primary"
                  size="sm"
                  className="text-xs font-heading uppercase tracking-wider flex items-center gap-1.5 bg-secondary hover:bg-secondary-dark text-on-secondary font-bold shadow-md shadow-secondary/20"
                >
                  <span>Book Service Now</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
