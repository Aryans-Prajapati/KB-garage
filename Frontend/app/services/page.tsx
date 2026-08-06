"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Shield, Wrench, Zap, Sparkles, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ALL_SERVICES = [
  {
    category: "Ceramic Coating & PPF",
    id: "ceramic",
    icon: Sparkles,
    packages: [
      {
        name: "Standard Ceramic (3-Year)",
        price: "$599",
        desc: "Single-stage paint correction, 9H Ceramic Shield on paintwork & wheels.",
        features: ["Paint Correction Stage 1", "9H Nano Ceramic Coating", "Wheel & Glass Sealant", "3-Year Warranty"],
      },
      {
        name: "Pro Ceramic Shield (5-Year)",
        price: "$899",
        desc: "Dual-stage paint restoration with hydrophobic multi-layer coating.",
        features: ["Paint Correction Stage 2", "Dual Layer Ceramic Matrix", "Full Wheel Barrel Coating", "Interior Leather Guard", "5-Year Warranty"],
        popular: true,
      },
      {
        name: "Full Armor PPF + Ceramic",
        price: "$1,899",
        desc: "Self-healing clear bra paint protection film on front bumper, hood & mirrors + 5-Year Ceramic.",
        features: ["Self-Healing PPF Front End", "Full Body Ceramic Coating", "Rock-Chip Protection", "10-Year Warranty"],
      },
    ],
  },
  {
    category: "Performance ECU Tuning",
    id: "tuning",
    icon: Zap,
    packages: [
      {
        name: "Stage 1 ECU Calibration",
        price: "$750",
        desc: "Software optimization calibrated on stock hardware (+15-25% HP & Torque gain).",
        features: ["Custom Dyno Run", "Speed Limiter Removal", "Throttle Response Mapping", "Stock Backup Retained"],
      },
      {
        name: "Stage 2 Performance Package",
        price: "$1,450",
        desc: "High-flow downpipe/exhaust integration + custom ECU/TCU transmission remapping.",
        features: ["Downpipe Integration", "TCU Gear Shift Speed Map", "Burbles / Pops Calibration (Optional)", "Real-time Telemetry Log"],
        popular: true,
      },
    ],
  },
  {
    category: "Routine & Specialized Service",
    id: "maintenance",
    icon: Wrench,
    packages: [
      {
        name: "Minor Maintenance Service",
        price: "$150",
        desc: "Synthetic oil replacement, OEM filter, multi-point vehicle inspection.",
        features: ["Liqui Moly / Motul Synthetic Oil", "OEM Oil Filter Replacement", "30-Point Safety Check", "Fluid Level Top-ups"],
      },
      {
        name: "Major Performance Service",
        price: "$450",
        desc: "Spark plugs, brake fluid flush, cabin/air filters, transmission fluid check.",
        features: ["Iridium Spark Plugs", "High-Temp DOT4 Brake Flush", "Engine & Cabin Air Filters", "Full Computer Scan"],
        popular: true,
      },
    ],
  },
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="py-12 space-y-16">
      {/* Header Banner */}
      <section className="bg-primary text-white py-16 px-margin-mobile md:px-margin-desktop text-center relative overflow-hidden">
        <div className="max-w-container-max mx-auto space-y-4">
          <Badge variant="secondary">Engineering Menu</Badge>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white">
            Services & Pricing Architecture
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
            Transparent pricing, manufacturer-exceeding standards, and specialized precision care for high-end automobiles.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop space-y-16">
        {ALL_SERVICES.map((section) => {
          const SectionIcon = section.icon;
          return (
            <div key={section.id} id={section.id} className="space-y-8 scroll-mt-28">
              <div className="flex items-center gap-3 border-b border-surface-container pb-4">
                <div className="w-10 h-10 rounded bg-secondary/10 text-secondary flex items-center justify-center">
                  <SectionIcon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary">
                    {section.category}
                  </h2>
                  <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                    Calibrated Solutions & Guarantee
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                {section.packages.map((pkg, i) => (
                  <Card
                    key={i}
                    className={`flex flex-col relative ${
                      pkg.popular ? "border-secondary border-2 shadow-lg" : ""
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute top-0 right-0 bg-secondary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl">
                        Most Popular
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-lg">{pkg.name}</CardTitle>
                      <div className="pt-2 flex items-baseline gap-1">
                        <span className="font-heading text-3xl font-extrabold text-primary">
                          {pkg.price}
                        </span>
                        <span className="text-xs text-on-surface-variant font-medium">/ service</span>
                      </div>
                      <CardDescription className="pt-2">{pkg.desc}</CardDescription>
                    </CardHeader>

                    <CardContent className="flex-grow space-y-3">
                      <div className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                        Package Inclusions:
                      </div>
                      <ul className="space-y-2 text-sm text-on-surface">
                        {pkg.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-tertiary shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>

                    <CardFooter>
                      <Link href={`/booking?service=${section.id}`} className="w-full">
                        <Button
                          variant={pkg.popular ? "primary" : "outline"}
                          size="md"
                          className="w-full flex items-center justify-center gap-2"
                        >
                          <span>Select Package</span>
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
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
              All Services Backed by Our Workmanship Warranty
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              We stand behind every bolt tightened, ECU map re-calibrated, and coat of ceramic protection applied. Work with complete peace of mind.
            </p>
          </div>
          <Link href="/booking">
            <Button variant="primary" size="lg" className="shrink-0">
              Book Custom Service
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
