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
    desc: "Comprehensive diagnostic & routine maintenance schedules for Indian driving conditions.",
    price: "₹2,499",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Suzuki_Swift_%282024%29_hybrid_IMG_8820.jpg/1280px-Suzuki_Swift_%282024%29_hybrid_IMG_8820.jpg",
    icon: Wrench,
    badge: "Essential",
  },
  {
    id: "ceramic",
    title: "Ceramic Coating & PPF",
    desc: "Ultra-hydrophobic paint protection film & 9H ceramic shield for monsoon & UV immunity.",
    price: "₹14,999",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Tata_Nexon_EV_in_Hyderabad_02.jpg/1280px-Tata_Nexon_EV_in_Hyderabad_02.jpg",
    icon: Sparkles,
    badge: "Popular",
  },
  {
    id: "tuning",
    title: "Performance ECU Tuning",
    desc: "Dyno-proven software optimization tailored for Indian fuel specs, torque boost & responsive acceleration.",
    price: "₹19,999",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mahindra_Thar_SUV_in_%22Red_Rage%22_color_at_Ashiana_Brahmanda%2C_East_Singbhum_India_%28Ank_Kumar%2C_Infosys_limited%29_03.jpg/1280px-Mahindra_Thar_SUV_in_%22Red_Rage%22_color_at_Ashiana_Brahmanda%2C_East_Singbhum_India_%28Ank_Kumar%2C_Infosys_limited%29_03.jpg",
    icon: Zap,
    badge: "High Performance",
  },
  {
    id: "detail",
    title: "Full Stage Detailing",
    desc: "Multi-stage paint correction, interior leather restoration, and precision engine bay steam cleaning.",
    price: "₹5,999",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/2024_Hyundai_Creta_1.5_MPi_SX%28O%29_%28India%29_front_view.png/1280px-2024_Hyundai_Creta_1.5_MPi_SX%28O%29_%28India%29_front_view.png",
    icon: ShieldCheck,
    badge: "Signature",
  },
];

const REVIEWS = [
  {
    name: "Rajesh Sharma",
    car: "Tata Safari Dark Edition",
    text: "KB Garage treated my Safari with surgical precision. The 9H ceramic coating completely transformed the deep black finish. Unrivaled Indian craftsmanship!",
    rating: 5,
  },
  {
    name: "Ananya Verma",
    car: "Mahindra XUV700 AX7L",
    text: "The Stage 1 ECU remap and PPF armor were done flawlessly. Mid-range torque is fantastic and online booking with INR pricing was seamless.",
    rating: 5,
  },
  {
    name: "Rohan Kapoor",
    car: "Hyundai Creta Turbo",
    text: "Fast turnarounds, incredible attention to detail, and top-notch customer support. KB Garage is the best garage in India for automotive enthusiasts.",
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
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-md leading-[1.1]">
              Precision Engineering for Your <span className="gold-shine-text">Passion.</span>
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
                <div className="text-2xl sm:text-3xl font-extrabold font-heading gold-shine-text">15+</div>
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
                <div className="text-2xl sm:text-3xl font-extrabold font-heading gold-shine-text">4.9 ★</div>
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
                      <Badge variant="neutral">
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
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-primary">
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
