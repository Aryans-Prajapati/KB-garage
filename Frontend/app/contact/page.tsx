"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Enquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 space-y-16">
      {/* Header */}
      <section className="bg-primary text-white py-16 px-margin-mobile md:px-margin-desktop text-center">
        <div className="max-w-container-max mx-auto space-y-3">
          <Badge variant="secondary">Get In Touch</Badge>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white">
            Contact KB Garage
          </h1>
          <p className="text-slate-300 max-w-xl mx-auto text-base">
            Have a technical question or need emergency trackside support? Connect directly with our team.
          </p>
        </div>
      </section>

      {/* Main Form & Info Grid */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Info Sidebar */}
        <div className="space-y-6">
          <Card className="p-6 space-y-6">
            <h3 className="font-heading text-xl font-bold text-primary">Garage Location</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-1" />
                <div>
                  <div className="font-bold text-primary">KB Garage HQ</div>
                  <div className="text-on-surface-variant">104 Precision Drive, Apex Motors Complex, CA 90210</div>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <div>
                  <div className="font-bold text-primary">Customer Hotline</div>
                  <div className="text-on-surface-variant">+1 (800) 555-0199</div>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <div>
                  <div className="font-bold text-primary">Service Email</div>
                  <div className="text-on-surface-variant">service@kbgarage.com</div>
                </div>
              </li>
            </ul>
          </Card>

          {/* Emergency Support Card */}
          <Card className="p-6 bg-secondary/5 border-secondary/30 space-y-3">
            <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              <span>Emergency Hotline</span>
            </div>
            <h4 className="font-heading font-bold text-primary text-base">24/7 Breakdown & Towing</h4>
            <p className="text-xs text-on-surface-variant">
              Direct emergency towing dispatch for enrolled supercar & performance vehicle clients.
            </p>
            <a href="tel:+18005550199" className="inline-block pt-1">
              <Button variant="primary" size="sm" className="w-full">
                Call Emergency Line
              </Button>
            </a>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="lg:col-span-2 p-8 space-y-6">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-tertiary/10 text-tertiary mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-primary">Message Sent Successfully!</h3>
              <p className="text-sm text-on-surface-variant max-w-md mx-auto">
                Thank you for contacting KB Garage. One of our service advisors will respond to <span className="font-bold">{form.email}</span> within 2 business hours.
              </p>
              <Button variant="outline" onClick={() => setSubmitted(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-surface-container pb-3">
                <h3 className="font-heading text-2xl font-bold text-primary">Send Us an Enquiry</h3>
                <p className="text-xs text-on-surface-variant uppercase tracking-wider mt-1">
                  Average Response Time: Under 2 Hours
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Marcus Vance"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-container-low border-b-2 border-outline-variant focus:border-secondary focus:outline-none rounded-sm text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="marcus@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-container-low border-b-2 border-outline-variant focus:border-secondary focus:outline-none rounded-sm text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-container-low border-b-2 border-outline-variant focus:border-secondary focus:outline-none rounded-sm text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">Enquiry Type</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-container-low border-b-2 border-outline-variant focus:border-secondary focus:outline-none rounded-sm text-sm"
                  >
                    <option value="General">General Service Inquiry</option>
                    <option value="Ceramic">Ceramic Coating & PPF Quote</option>
                    <option value="Tuning">Custom ECU Tuning Consultation</option>
                    <option value="Track">Trackside Support Prep</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">Message / Vehicle Notes *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide details about your vehicle (Year, Make, Model) and desired service..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 bg-surface-container-low border-b-2 border-outline-variant focus:border-secondary focus:outline-none rounded-sm text-sm resize-none"
                />
              </div>

              <Button variant="primary" size="lg" type="submit" className="w-full flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                <span>Transmit Message</span>
              </Button>
            </form>
          )}
        </Card>
      </section>
    </div>
  );
}
