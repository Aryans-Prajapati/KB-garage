"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Porsche 911 GT3 RS",
    category: "ceramic",
    badge: "5-Year Ceramic",
    desc: "Stage 2 paint restoration followed by dual-layer 9H nano ceramic matrix.",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    title: "BMW M4 Competition",
    category: "ppf",
    badge: "Full PPF Armor",
    desc: "Complete self-healing paint protection film installation on glossy finish.",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    title: "Audi RS6 Avant",
    category: "tuning",
    badge: "Stage 2 ECU + Downpipe",
    desc: "Custom dyno-proven ECU remapping yielding +140 HP and 180 Nm torque boost.",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 4,
    title: "Mercedes-AMG GT R",
    category: "ceramic",
    badge: "Paint Correction",
    desc: "Swirl mark elimination & mirror gloss finish with hydrophobic barrier.",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 5,
    title: "Lamborghini Huracán Evo",
    category: "detailing",
    badge: "Full Interior + Engine Steam",
    desc: "Precision leather conditioning and dust-free engine compartment detailing.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 6,
    title: "Ferrari F8 Tributo",
    category: "ppf",
    badge: "Front Bumper & Hood PPF",
    desc: "High-impact rock chip protection film custom cut for Ferrari bodylines.",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1000&q=80",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "ceramic", label: "Ceramic Coating" },
  { id: "ppf", label: "Paint Protection Film (PPF)" },
  { id: "tuning", label: "ECU Tuning" },
  { id: "detailing", label: "Full Detailing" },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");

  const filteredItems =
    filter === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <div className="py-12 space-y-12">
      {/* Header */}
      <section className="bg-primary text-white py-16 px-margin-mobile md:px-margin-desktop text-center">
        <div className="max-w-container-max mx-auto space-y-3">
          <Badge variant="secondary">Showcase Portfolio</Badge>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white">
            Transformations Gallery
          </h1>
          <p className="text-slate-300 max-w-xl mx-auto text-base">
            Inspect our completed detailing, tuning, ceramic, and PPF projects on world-class automobiles.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-wrap justify-center gap-2 pb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all ${
                filter === cat.id
                  ? "bg-secondary text-white shadow-sm"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter pt-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group overflow-hidden flex flex-col">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary">{item.badge}</Badge>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-xl font-bold text-primary">{item.title}</h3>
                  <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">{item.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-surface-container flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase text-tertiary flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verified KB Standard</span>
                  </span>
                  <Link href="/booking">
                    <Button variant="ghost" size="sm" className="text-secondary hover:text-secondary-dark p-0">
                      <span>Book Similar</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="bg-surface-container-lowest border-t border-outline-variant py-12 px-margin-mobile text-center">
        <div className="max-w-xl mx-auto space-y-4">
          <h3 className="font-heading text-2xl font-bold text-primary">Want Your Car Featured in Our Gallery?</h3>
          <p className="text-sm text-on-surface-variant">Schedule a consultation with our master detailing staff today.</p>
          <Link href="/booking">
            <Button variant="primary" size="md">
              Book Appointment Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
