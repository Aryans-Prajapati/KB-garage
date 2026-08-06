import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, ShieldCheck, Wrench, Users, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TEAM = [
  {
    name: "Viktor Vance",
    role: "Founder & Master Dyno Calibrator",
    exp: "18+ Years Experience",
    bio: "Ex-factory Porsche Motorsport technician specializing in custom ECU remaps and powertrain telemetry.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Elena Rostova",
    role: "Head of Detailing & Ceramic Coatings",
    exp: "12+ Years Experience",
    bio: "Certified International Detailing Association (IDA) master technician specializing in multi-stage paint correction.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Marcus Thorne",
    role: "Lead Mechanical Engineer",
    exp: "15+ Years Experience",
    bio: "Specialist in twin-turbo induction setups, custom titanium exhausts, and track safety prep.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  },
];

export default function AboutPage() {
  return (
    <div className="py-12 space-y-16">
      {/* Header */}
      <section className="bg-primary text-white py-16 px-margin-mobile md:px-margin-desktop text-center">
        <div className="max-w-container-max mx-auto space-y-3">
          <Badge variant="secondary">Heritage & Passion</Badge>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white">
            About KB Garage
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
            Founded on the relentless pursuit of automotive perfection, KB Garage combines aerospace-grade diagnostics with artisanal detailing.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <Badge variant="secondary">Established 2011</Badge>
          <h2 className="font-heading text-3xl font-extrabold text-primary leading-tight">
            Built by Enthusiasts for Owners Who Demand the Best
          </h2>
          <p className="text-on-surface-variant text-base leading-relaxed">
            KB Garage was established to eliminate the guesswork and compromise associated with traditional auto workshops. We designed a clean-room facility equipped with AWD dyno bays, infrared ceramic curing lamps, and dust-free PPF clean zones.
          </p>
          <p className="text-on-surface-variant text-base leading-relaxed">
            Every vehicle entering KB Garage receives a digital health inspection, video documentation, and custom-calibrated solutions tailored to its exact specification.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-surface-container-low rounded border border-outline-variant">
              <div className="font-heading text-2xl font-extrabold text-secondary">100%</div>
              <div className="text-xs uppercase text-slate-500 font-semibold mt-1">Dust-Free Clean Room</div>
            </div>
            <div className="p-4 bg-surface-container-low rounded border border-outline-variant">
              <div className="font-heading text-2xl font-extrabold text-tertiary">AWD</div>
              <div className="text-xs uppercase text-slate-500 font-semibold mt-1">Synchronized Dyno Cell</div>
            </div>
          </div>
        </div>

        <div className="relative h-[420px] w-full rounded-lg overflow-hidden border border-outline-variant shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1000&q=80"
            alt="KB Garage Workshop Clean Facility"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-surface-container-low py-16 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <Badge variant="secondary">Master Technicians</Badge>
            <h2 className="font-heading text-3xl font-extrabold text-primary">
              Meet Our Specialist Team
            </h2>
            <p className="text-on-surface-variant text-sm">
              Certified experts with decades of high-performance automotive background.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {TEAM.map((member, i) => (
              <Card key={i} className="flex flex-col">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary">{member.exp}</Badge>
                  </div>
                </div>
                <div className="p-6 flex-grow space-y-2">
                  <h3 className="font-heading text-xl font-bold text-primary">{member.name}</h3>
                  <div className="text-xs font-bold uppercase text-secondary">{member.role}</div>
                  <p className="text-sm text-on-surface-variant pt-2 leading-relaxed">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
