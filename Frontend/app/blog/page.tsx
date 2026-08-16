"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchBlogPosts, getCached } from "@/lib/api";

const FALLBACK_POSTS = [
  {
    id: 1,
    title: "Understanding Ceramic Coating vs PPF: Which Protection Does Your Car Need?",
    category: "Detailing Guide",
    date_str: "August 2, 2026",
    read_time: "5 min read",
    desc: "A technical breakdown of ceramic hydrophobic coatings vs self-healing paint protection films for high-speed rock chip defense.",
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Stage 1 vs Stage 2 ECU Remaps: Safe Horsepower Gains Explained",
    category: "Performance Tuning",
    date_str: "July 28, 2026",
    read_time: "7 min read",
    desc: "Learn how dyno telemetry and software calibration unlock hidden torque while preserving engine longevity.",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Why Multi-Stage Paint Correction is Essential Before Ceramic Shielding",
    category: "Paint Restoration",
    date_str: "July 19, 2026",
    read_time: "4 min read",
    desc: "How swirl marks, micro-scratches, and orange peel reduction prepare the clear coat for flawless ceramic bonding.",
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80",
  },
];

export default function BlogPage() {
  const cachedData = getCached<any[]>("blogs");
  const [posts, setPosts] = useState<any[]>(() => {
    if (Array.isArray(cachedData) && cachedData.length > 0) return cachedData;
    return FALLBACK_POSTS;
  });

  useEffect(() => {
    fetchBlogPosts()
      .then((data) => {
        if (data && data.length > 0) setPosts(data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="pb-16 space-y-16">
      {/* Header */}
      <section className="bg-primary text-white py-16 px-margin-mobile md:px-margin-desktop text-center">
        <div className="max-w-container-max mx-auto space-y-3">
          <Badge variant="secondary">Knowledge Hub & Reviews</Badge>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white">
            Automotive Insights & Articles
          </h1>
          <p className="text-slate-300 max-w-xl mx-auto text-base">
            Technical guides, detailing advice, performance tuning breakdowns, and client stories.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col group">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary">{post.category}</Badge>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
                    <span>{post.date_str || "August 2026"}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.read_time || "5 min read"}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-primary leading-snug group-hover:text-secondary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant line-clamp-3 leading-relaxed">
                    {post.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-surface-container flex items-center justify-between text-xs font-bold uppercase text-secondary">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
