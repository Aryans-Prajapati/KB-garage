"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Star,
  Wrench,
  Award,
  Clock,
  Car,
  Shield
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
      {/* Header Banner Section */}
      <section className="bg-primary text-white py-16 px-margin-mobile md:px-margin-desktop text-center relative overflow-hidden">
        <div className="max-w-container-max mx-auto space-y-4 relative z-10">
          <Badge variant="secondary">Authorized Partner Network</Badge>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white">
            Authorized <span className="gold-shine-text">Dealerships</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
            KB Garage official dealership partnerships bringing Formula 1™ grade fluid engineering, multi-brand garage blueprints, and doorstep mobile vehicle care under one roof.
          </p>
        </div>
      </section>

      {/* Filter Navigation Tabs */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all ${
              activeFilter === "all"
                ? "bg-secondary text-on-secondary shadow-sm font-extrabold"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container font-semibold"
            }`}
          >
            All Divisions (3)
          </button>
          <button
            onClick={() => setActiveFilter("petronas")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center gap-1.5 ${
              activeFilter === "petronas"
                ? "bg-secondary text-on-secondary shadow-sm font-extrabold"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container font-semibold"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Petronas (1st in India)
          </button>
          <button
            onClick={() => setActiveFilter("indomotive")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all ${
              activeFilter === "indomotive"
                ? "bg-secondary text-on-secondary shadow-sm font-extrabold"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container font-semibold"
            }`}
          >
            Indomotive
          </button>
          <button
            onClick={() => setActiveFilter("spinoto")}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all ${
              activeFilter === "spinoto"
                ? "bg-secondary text-on-secondary shadow-sm font-extrabold"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container font-semibold"
            }`}
          >
            Spinoto Mobile
          </button>
        </div>
      </section>

      {/* Dealership Cards List */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop space-y-10">
        {filteredDealerships.map((dealership, index) => (
          <motion.div
            key={dealership.id}
            id={dealership.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="flex flex-col relative overflow-hidden border border-outline-variant group">
              {/* Top Accent Line */}
              <div className="h-1.5 w-full bg-secondary" />

              <CardHeader className="p-6 sm:p-8 space-y-3">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                      KB Garage Official Partner Division
                    </span>
                    <CardTitle className="text-2xl sm:text-3xl font-heading font-extrabold text-primary">
                      {dealership.name}
                    </CardTitle>
                    <CardDescription className="text-sm italic font-medium text-on-surface-variant">
                      &quot;{dealership.tagline}&quot;
                    </CardDescription>
                  </div>

                  <div>
                    <Badge variant="secondary">{dealership.badge}</Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-6 sm:px-8 space-y-6">
                <p className="text-sm sm:text-base leading-relaxed text-on-surface-variant font-body">
                  {dealership.description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {dealership.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded bg-surface-container-low border border-outline-variant text-center"
                    >
                      <div className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                        {stat.label}
                      </div>
                      <div className="font-heading font-extrabold text-primary text-sm mt-1 gold-shine-text">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Key Offerings Checklist */}
                <div className="space-y-2.5 pt-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                    Key Division Capabilities & Standards:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {dealership.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-on-surface-variant">
                        <CheckCircle2 className="w-4 h-4 text-tertiary shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location & Contact Bar */}
                <div className="p-4 rounded bg-surface-container-lowest border border-outline-variant flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-secondary shrink-0" />
                    <span className="font-medium">{dealership.location}</span>
                  </div>
                  <div className="flex items-center gap-4 flex-wrap font-medium">
                    <a href={`tel:${dealership.phone.replace(/\s+/g, "")}`} className="flex items-center gap-1 hover:text-secondary transition-colors">
                      <Phone className="w-3.5 h-3.5 text-secondary shrink-0" />
                      <span>{dealership.phone}</span>
                    </a>
                    <a href={`mailto:${dealership.email}`} className="flex items-center gap-1 hover:text-secondary transition-colors">
                      <Mail className="w-3.5 h-3.5 text-secondary shrink-0" />
                      <span>{dealership.email}</span>
                    </a>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="px-6 sm:px-8 py-4 border-t border-surface-container flex items-center justify-end">
                <Link href={`/booking?dealership=${dealership.id}`}>
                  <Button variant="primary" size="md" className="flex items-center gap-2">
                    <span>Book Division Service</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* Feature Guarantee Box */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-tertiary font-bold text-xs uppercase tracking-wider">
              <Shield className="w-5 h-5" />
              <span>KB Garage Guarantee</span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-primary">
              All Division Services Backed by KB Garage Engineering Standards
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Whether serviced at our flagship Petronas hub, Indomotive franchise bay, or via Spinoto doorstep mobile mechanics, every vehicle receives certified diagnostic care.
            </p>
          </div>
          <Link href="/booking">
            <Button variant="primary" size="lg" className="shrink-0">
              Schedule Appointment
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
