"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, Shield, Wrench, Zap, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchServices, FALLBACK_SERVICES, getCached } from "@/lib/api";

const ICON_MAP: Record<string, any> = {
  Wrench: Wrench,
  Zap: Zap,
  Sparkles: Sparkles,
  ShieldCheck: ShieldCheck,
};

export default function ServicesPage() {
  const cachedData = getCached<any[]>("services");
  const [services, setServices] = useState<any[]>(() => {
    if (Array.isArray(cachedData) && cachedData.length > 0) {
      return cachedData.filter((s: any) => s.is_active !== false);
    }
    return [];
  });
  const [loading, setLoading] = useState(!cachedData);

  useEffect(() => {
    fetchServices()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data.filter((s: any) => s.is_active !== false));
        } else {
          setServices(FALLBACK_SERVICES);
        }
      })
      .catch(() => {
        setServices(FALLBACK_SERVICES);
      })
      .finally(() => setLoading(false));
  }, []);

  // Group services by category dynamically
  const groupedCategories = services.reduce((acc: Record<string, any[]>, service: any) => {
    const rawCat = service.category || "General Maintenance";
    // Normalize category display name
    let catTitle = rawCat;
    if (rawCat.toLowerCase() === "detailing") catTitle = "Ceramic Coating & PPF Armor";
    else if (rawCat.toLowerCase() === "performance") catTitle = "Performance ECU Tuning";
    else if (rawCat.toLowerCase() === "maintenance") catTitle = "Routine & Specialized Maintenance";

    if (!acc[catTitle]) {
      acc[catTitle] = [];
    }
    acc[catTitle].push(service);
    return acc;
  }, {});

  return (
    <div className="pb-16 space-y-16">
      {/* Header Banner */}
      <section className="bg-primary text-white py-16 px-margin-mobile md:px-margin-desktop text-center relative overflow-hidden">
        <div className="max-w-container-max mx-auto space-y-4">
          <Badge variant="secondary">Engineering Menu</Badge>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white">
            Services & <span className="gold-shine-text">Pricing</span> Architecture
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
            Transparent pricing, manufacturer-exceeding standards, and specialized precision care for high-end automobiles.
          </p>
        </div>
      </section>

      {/* Dynamic Services List from API */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop space-y-16">
        {loading ? (
          <div className="text-center py-12 text-slate-500 font-semibold">Loading live service catalog...</div>
        ) : (
          Object.keys(groupedCategories).map((categoryName) => {
            const catServices = groupedCategories[categoryName];
            return (
              <div key={categoryName} className="space-y-8 scroll-mt-28">
                <div className="flex items-center gap-3 border-b border-surface-container pb-4">
                  <div className="w-10 h-10 rounded bg-secondary/10 text-secondary flex items-center justify-center">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary">
                      {categoryName}
                    </h2>
                    <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                      Calibrated Solutions & Workmanship Guarantee
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                  {catServices.map((service: any) => {
                    const IconComponent = ICON_MAP[service.icon_name] || Wrench;
                    const isPopular = service.badge === "Popular" || service.badge === "Ultimate Armor";

                    return (
                      <Card
                        key={service.id || service.service_id}
                        className={`flex flex-col relative overflow-hidden transition-all duration-300 ${
                          isPopular ? "border-secondary border-2 shadow-lg" : "border-slate-200"
                        }`}
                      >
                        {service.image && (
                          <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                            <Image
                              src={service.image}
                              alt={service.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 hover:scale-105"
                            />
                            {service.badge && (
                              <div className="absolute top-3 right-3">
                                <Badge variant="neutral">{service.badge}</Badge>
                              </div>
                            )}
                          </div>
                        )}

                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                              <IconComponent className="w-4 h-4 text-secondary" />
                            </div>
                            <CardTitle className="text-lg font-bold text-primary">{service.title}</CardTitle>
                          </div>
                          <div className="pt-2 flex items-baseline gap-1">
                            <span className="font-heading text-3xl font-extrabold gold-shine-text">
                              {service.price_inr}
                            </span>
                            <span className="text-xs text-on-surface-variant font-medium">/ service</span>
                          </div>
                          <CardDescription className="pt-2 text-slate-600 leading-relaxed">
                            {service.desc}
                          </CardDescription>
                        </CardHeader>

                        <CardFooter className="mt-auto pt-4">
                          <Link href={`/booking?service=${service.service_id || service.id}`} className="w-full">
                            <Button
                              variant={isPopular ? "primary" : "outline"}
                              size="md"
                              className="w-full flex items-center justify-center gap-2"
                            >
                              <span>Book This Service</span>
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
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
