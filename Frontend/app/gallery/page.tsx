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
    title: "Tata Nexon EV (Dark Edition)",
    category: "ceramic",
    badge: "5-Year Ceramic Shield",
    desc: "Stage 2 paint restoration followed by dual-layer 9H nano ceramic shield for intense shine.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Tata_Nexon_EV_in_Hyderabad_02.jpg/1280px-Tata_Nexon_EV_in_Hyderabad_02.jpg",
  },
  {
    id: 2,
    title: "Mahindra Thar 4x4 (Red Rage)",
    category: "tuning",
    badge: "Stage 1 ECU + Offroad Tuning",
    desc: "Dyno-proven ECU remapping boosting low-end torque for mountain trails & highway cruising.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mahindra_Thar_SUV_in_%22Red_Rage%22_color_at_Ashiana_Brahmanda%2C_East_Singbhum_India_%28Ank_Kumar%2C_Infosys_limited%29_03.jpg/1280px-Mahindra_Thar_SUV_in_%22Red_Rage%22_color_at_Ashiana_Brahmanda%2C_East_Singbhum_India_%28Ank_Kumar%2C_Infosys_limited%29_03.jpg",
  },
  {
    id: 3,
    title: "Hyundai Creta SX(O) 2024",
    category: "ppf",
    badge: "Full TPU PPF Armor",
    desc: "Self-healing clear bra paint protection film against gravel, scratches, and Indian road debris.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/2024_Hyundai_Creta_1.5_MPi_SX%28O%29_%28India%29_front_view.png/1280px-2024_Hyundai_Creta_1.5_MPi_SX%28O%29_%28India%29_front_view.png",
  },
  {
    id: 4,
    title: "Toyota Fortuner Legender",
    category: "detailing",
    badge: "Full Interior + Engine Steam",
    desc: "Precision leather conditioning, interior sanitization, and dust-free engine bay detailing.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/2021_Toyota_Fortuner_2.8_VRZ_4x4_%28Malaysia%29_front_view.jpg/1280px-2021_Toyota_Fortuner_2.8_VRZ_4x4_%28Malaysia%29_front_view.jpg",
  },
  {
    id: 5,
    title: "Volkswagen Virtus 1.5 GT (India)",
    category: "tuning",
    badge: "Stage 2 Remap & Exhaust",
    desc: "Custom TCU gear shift speed mapping, performance downpipe, and crackle tune calibration.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/2022_Volkswagen_Virtus_1.5_GT_%28India%29_front_view_01.png/1280px-2022_Volkswagen_Virtus_1.5_GT_%28India%29_front_view_01.png",
  },
  {
    id: 6,
    title: "Maruti Suzuki Swift ZXi+",
    category: "ceramic",
    badge: "Paint Correction & Polish",
    desc: "Complete scratch removal, high-gloss machine polishing, and hydrophobic paint sealant.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Suzuki_Swift_%282024%29_hybrid_IMG_8820.jpg/1280px-Suzuki_Swift_%282024%29_hybrid_IMG_8820.jpg",
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
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all ${filter === cat.id
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
