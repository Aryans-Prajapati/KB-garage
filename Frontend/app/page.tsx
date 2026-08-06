"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Wrench,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle2,
  Calendar,
  Award,
  Clock,
  Gauge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SERVICES = [
  {
    id: "general",
    title: "General Maintenance",
    desc: "Comprehensive diagnostic & routine maintenance schedules to keep your vehicle performing at its peak.",
    price: "$150",
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80",
    icon: Wrench,
    badge: "Essential",
  },
  {
    id: "ceramic",
    title: "Ceramic Coating & PPF",
    desc: "Ultra-hydrophobic paint protection film & 9H ceramic shield for mirror-like brilliance and scratch immunity.",
    price: "$599",
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80",
    icon: Sparkles,
    badge: "Popular",
  },
  {
    id: "tuning",
    title: "Performance ECU Tuning",
    desc: "Dyno-proven software optimization, custom exhaust upgrades, and horsepower enhancements for high-rev engines.",
    price: "$750",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
    icon: Zap,
    badge: "High Performance",
  },
  {
    id: "detail",
    title: "Full Stage Detailing",
    desc: "Multi-stage paint correction, interior leather restoration, and precision engine bay steam cleaning.",
    price: "$350",
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80",
    icon: ShieldCheck,
    badge: "Signature",
  },
];

const REVIEWS = [
  {
    name: "Marcus Vance",
    car: "Porsche 911 GT3 RS",
    text: "KB Garage treated my GT3 RS with surgical precision. The 9H ceramic coating and custom exhaust tuning completely transformed the car. Unrivaled craftsmanship!",
    rating: 5,
  },
  {
    name: "Elena Rostova",
    car: "BMW M4 Competition",
    text: "The ECU remap and PPF protection were done flawlessly. Transparent pricing, state-of-the-art facility, and technicians who actually care.",
    rating: 5,
  },
  {
    name: "David Sterling",
    car: "Audi RS6 Avant",
    text: "Fast turnarounds, incredible attention to detail, and seamless online booking. KB Garage is the only garage I trust with my vehicle.",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1920&q=80"
            alt="KB Garage Hero Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-primary/60 to-primary/80" />
        </div>

        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-xs font-semibold uppercase tracking-widest">
              <Award className="w-4 h-4" />
              <span>Precision Automotive Engineering</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-md leading-[1.1]">
              Precision Engineering for Your <span className="text-secondary">Passion.</span>
            </h1>

            <p className="font-body text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed drop-shadow">
              Experience the ultimate in automotive care, tuning, ceramic protection, and maintenance. Meticulous attention to detail for vehicles that demand perfection.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/booking">
                <Button variant="primary" size="lg" className="w-full sm:w-auto flex items-center gap-3">
                  <Calendar className="w-5 h-5" />
                  <span>Book a Service</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-400 text-white hover:bg-white/10 hover:text-white">
                  <span>Explore Menu</span>
                </Button>
              </Link>
            </div>

            {/* Quick Stats Banner */}
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto border-t border-slate-800/80">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-secondary">15+</div>
                <div className="text-xs uppercase text-slate-400 font-semibold tracking-wider">Years Excellence</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-tertiary">3,500+</div>
                <div className="text-xs uppercase text-slate-400 font-semibold tracking-wider">Supercars Serviced</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white">99.8%</div>
                <div className="text-xs uppercase text-slate-400 font-semibold tracking-wider">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-secondary">4.9 ★</div>
                <div className="text-xs uppercase text-slate-400 font-semibold tracking-wider">Client Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Categories Grid */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-secondary text-xs font-bold uppercase tracking-widest mb-2">Capabilities</div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-primary">
              Our Signature Services
            </h2>
            <p className="text-on-surface-variant text-sm sm:text-base mt-2">
              Master expertise across all mechanical, tuning, and aesthetic disciplines.
            </p>
          </div>
          <Link href="/services">
            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-secondary">
              <span>View Full Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {SERVICES.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col group">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant={item.badge === "Popular" ? "secondary" : "neutral"}>
                        {item.badge}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="w-10 h-10 rounded bg-primary-container/10 flex items-center justify-center text-primary mb-2">
                      <Icon className="w-5 h-5 text-secondary" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.desc}</CardDescription>
                  </CardHeader>

                  <CardFooter className="mt-auto">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Starting <span className="text-primary text-base font-extrabold">{item.price}</span>
                    </span>
                    <Link href={`/booking?service=${item.id}`}>
                      <Button variant="ghost" size="sm" className="px-2 text-secondary hover:text-secondary-dark">
                        <span>Book</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Why Choose KB Garage Section */}
      <section className="bg-primary text-white py-section-gap px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge variant="secondary">Why KB Garage</Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Engineered Standards. Zero Compromise.
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              We treat every vehicle as an architectural masterwork. From high-end supercar ceramic protection to precision diagnostic tuning, our garage delivers manufacturer-exceeding standards.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-secondary/20 flex items-center justify-center shrink-0">
                  <Gauge className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-heading text-lg font-bold text-white">Dyno-Certified Tuning</h4>
                  <p className="text-sm text-slate-400 mt-1">Real-time telemetry and customized ECU maps calibrated for maximum torque and efficiency.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-tertiary/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-tertiary" />
                </div>
                <div>
                  <h4 className="font-heading text-lg font-bold text-white">Transparent Digital Inspection</h4>
                  <p className="text-sm text-slate-400 mt-1">Detailed photo and video service logs delivered directly to your mobile phone before any work begins.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="font-heading text-lg font-bold text-white">On-Time Service Guarantee</h4>
                  <p className="text-sm text-slate-400 mt-1">Strict turnaround commitments with complimentary loaner vehicles for extended detailing projects.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Showcase */}
          <div className="relative h-[450px] w-full rounded-lg overflow-hidden border border-slate-800 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
              alt="Supercar Workshop at KB Garage"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent flex items-end p-8">
              <div className="bg-primary/80 backdrop-blur-md p-4 rounded border border-slate-700 w-full flex items-center justify-between">
                <div>
                  <div className="font-heading font-bold text-white text-base">KB Garage Main Bay</div>
                  <div className="text-xs text-slate-400">Dust-Free Climate Controlled Clean Room</div>
                </div>
                <Badge variant="success">Active Status</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="secondary">Verified Client Feedback</Badge>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-primary mt-3">
            Trusted by Automotive Enthusiasts
          </h2>
          <p className="text-on-surface-variant text-sm sm:text-base mt-2">
            Read what owners of high-performance vehicles say about our work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {REVIEWS.map((rev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="h-full flex flex-col p-6">
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-on-surface italic leading-relaxed flex-grow">
                  &quot;{rev.text}&quot;
                </p>
                <div className="pt-4 mt-4 border-t border-surface-container flex items-center justify-between">
                  <div>
                    <div className="font-heading text-sm font-bold text-primary">{rev.name}</div>
                    <div className="text-xs text-secondary font-medium">{rev.car}</div>
                  </div>
                  <Badge variant="success">Verified Owner</Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Booking Banner */}
      <section className="bg-gradient-to-r from-primary via-primary-container to-primary text-white py-16 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto text-center space-y-6">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            Ready to Give Your Vehicle the KB Garage Standard?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-base">
            Book your service online in under 2 minutes with real-time date & time slot selection.
          </p>
          <div className="pt-2">
            <Link href="/booking">
              <Button variant="primary" size="lg" className="inline-flex items-center gap-3">
                <Calendar className="w-5 h-5" />
                <span>Reserve Your Appointment</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
