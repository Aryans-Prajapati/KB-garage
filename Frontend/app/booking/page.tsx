"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Wrench,
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stepper } from "@/components/ui/stepper";

const STEPS = [
  { id: 1, title: "Vehicle Info" },
  { id: 2, title: "Service" },
  { id: 3, title: "Schedule" },
  { id: 4, title: "Confirm" },
];

const TIME_SLOTS = [
  "08:30 AM",
  "10:00 AM",
  "11:30 AM",
  "01:30 PM",
  "03:00 PM",
  "04:30 PM",
];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [vehicle, setVehicle] = useState({
    make: "",
    model: "",
    year: "2023",
    mileage: "",
    plate: "",
  });

  const [selectedService, setSelectedService] = useState("ceramic");
  const [selectedDate, setSelectedDate] = useState("2026-08-10");
  const [selectedTime, setSelectedTime] = useState("10:00 AM");

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  if (submitted) {
    return (
      <div className="py-20 max-w-xl mx-auto px-margin-mobile text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-tertiary/10 text-tertiary mx-auto flex items-center justify-center border-2 border-tertiary">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <Badge variant="success">Booking Confirmed</Badge>
        <h1 className="font-heading text-3xl font-extrabold text-primary">
          Appointment Scheduled!
        </h1>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          Thank you, <span className="font-bold text-primary">{contact.name || "Valued Client"}</span>. Your service reservation for your <span className="font-bold text-primary">{vehicle.year} {vehicle.make} {vehicle.model}</span> on <span className="font-bold text-secondary">{selectedDate} at {selectedTime}</span> has been confirmed.
        </p>

        <Card className="p-6 text-left space-y-3 bg-surface-container-low">
          <div className="text-xs font-bold uppercase text-slate-400">Reservation Summary</div>
          <div className="flex justify-between text-sm py-1 border-b border-surface-container">
            <span className="text-on-surface-variant">Reference ID:</span>
            <span className="font-mono font-bold text-primary">KB-{Math.floor(100000 + Math.random() * 900000)}</span>
          </div>
          <div className="flex justify-between text-sm py-1 border-b border-surface-container">
            <span className="text-on-surface-variant">Location:</span>
            <span className="font-medium text-primary">104 Precision Drive, Apex Motors Complex</span>
          </div>
          <div className="flex justify-between text-sm py-1 border-b border-surface-container">
            <span className="text-on-surface-variant">Contact Email:</span>
            <span className="font-medium text-primary">{contact.email || "client@email.com"}</span>
          </div>
        </Card>

        <div className="pt-4 flex justify-center gap-4">
          <Button variant="primary" onClick={() => (window.location.href = "/")}>
            Return to Homepage
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <Badge variant="secondary">Online Reservation</Badge>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-primary">
          Book Your KB Garage Service
        </h1>
        <p className="text-on-surface-variant text-sm sm:text-base">
          Reserve your precision service slot in 4 simple steps.
        </p>
      </div>

      {/* Stepper Progress */}
      <div className="max-w-2xl mx-auto">
        <Stepper steps={STEPS} currentStep={currentStep} onStepClick={(s) => s <= currentStep && setCurrentStep(s)} />
      </div>

      {/* Step Content Container */}
      <Card className="max-w-3xl mx-auto p-6 md:p-10 shadow-md">
        <AnimatePresence mode="wait">
          {/* Step 1: Vehicle Info */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 font-heading text-xl font-bold text-primary border-b border-surface-container pb-3">
                <Car className="w-5 h-5 text-secondary" />
                <h2>Step 1: Vehicle Specifications</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">Make / Brand *</label>
                  <input
                    type="text"
                    placeholder="e.g. Porsche, BMW, Audi"
                    value={vehicle.make}
                    onChange={(e) => setVehicle({ ...vehicle, make: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-container-low border-b-2 border-outline-variant focus:border-secondary focus:outline-none rounded-sm text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">Model *</label>
                  <input
                    type="text"
                    placeholder="e.g. 911 GT3, M4, RS6"
                    value={vehicle.model}
                    onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-container-low border-b-2 border-outline-variant focus:border-secondary focus:outline-none rounded-sm text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">Model Year</label>
                  <select
                    value={vehicle.year}
                    onChange={(e) => setVehicle({ ...vehicle, year: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-container-low border-b-2 border-outline-variant focus:border-secondary focus:outline-none rounded-sm text-sm"
                  >
                    {Array.from({ length: 25 }, (_, i) => 2026 - i).map((yr) => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">Mileage (Approx)</label>
                  <input
                    type="text"
                    placeholder="e.g. 12,500 mi"
                    value={vehicle.mileage}
                    onChange={(e) => setVehicle({ ...vehicle, mileage: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-container-low border-b-2 border-outline-variant focus:border-secondary focus:outline-none rounded-sm text-sm"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Service Selection */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 font-heading text-xl font-bold text-primary border-b border-surface-container pb-3">
                <Wrench className="w-5 h-5 text-secondary" />
                <h2>Step 2: Select Service Discipline</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "ceramic", title: "Ceramic Coating (3-5 Year)", price: "From $599" },
                  { id: "ppf", title: "Full PPF Paint Armor", price: "From $1,899" },
                  { id: "tuning", title: "Stage 1/2 ECU Tuning", price: "From $750" },
                  { id: "maintenance", title: "Comprehensive Service", price: "From $150" },
                ].map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedService(s.id)}
                    className={`p-4 rounded border-2 cursor-pointer transition-all ${
                      selectedService === s.id
                        ? "border-secondary bg-secondary/5 ring-2 ring-secondary/20"
                        : "border-outline-variant bg-surface-container-lowest hover:border-slate-400"
                    }`}
                  >
                    <div className="font-heading font-bold text-primary text-base">{s.title}</div>
                    <div className="text-xs text-secondary font-bold uppercase tracking-wider mt-1">{s.price}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Schedule Date/Time */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 font-heading text-xl font-bold text-primary border-b border-surface-container pb-3">
                <CalendarIcon className="w-5 h-5 text-secondary" />
                <h2>Step 3: Appointment Date & Time</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-2">Select Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container-low border-b-2 border-outline-variant focus:border-secondary focus:outline-none rounded-sm text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-2">Available Time Slots</label>
                  <div className="grid grid-cols-2 gap-2">
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTime(t)}
                        className={`py-2 px-3 text-xs font-bold rounded border transition-all ${
                          selectedTime === t
                            ? "bg-secondary text-white border-secondary shadow-sm"
                            : "bg-surface-container-low text-on-surface border-outline-variant hover:border-secondary"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Contact & Confirm */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 font-heading text-xl font-bold text-primary border-b border-surface-container pb-3">
                <User className="w-5 h-5 text-secondary" />
                <h2>Step 4: Contact & Final Review</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">Full Name *</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-container-low border-b-2 border-outline-variant focus:border-secondary focus:outline-none rounded-sm text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-container-low border-b-2 border-outline-variant focus:border-secondary focus:outline-none rounded-sm text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-on-surface-variant mb-1">Email Address *</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className="w-full px-4 py-3 bg-surface-container-low border-b-2 border-outline-variant focus:border-secondary focus:outline-none rounded-sm text-sm"
                />
              </div>

              {/* Summary Box */}
              <div className="bg-primary/5 p-4 rounded border border-primary/10 space-y-2">
                <div className="text-xs font-bold uppercase text-primary">Summary Confirmation:</div>
                <div className="text-xs text-on-surface-variant">
                  Vehicle: <span className="font-semibold text-primary">{vehicle.year} {vehicle.make || "Custom Vehicle"} {vehicle.model}</span> | Date: <span className="font-semibold text-secondary">{selectedDate} @ {selectedTime}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Controls */}
        <div className="pt-8 flex justify-between items-center border-t border-surface-container mt-6">
          <Button
            variant="outline"
            size="md"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>

          <Button variant="primary" size="md" onClick={handleNext} className="flex items-center gap-2">
            <span>{currentStep === 4 ? "Confirm Appointment" : "Continue"}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
