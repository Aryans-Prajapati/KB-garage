"use client";

import React, { useState, useEffect } from "react";
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
import { createBooking, fetchServices } from "@/lib/api";

const STEPS = [
  { id: 1, title: "Vehicle Selection" },
  { id: 2, title: "Service" },
  { id: 3, title: "Schedule" },
  { id: 4, title: "Confirm" },
];

const TIME_SLOTS = [
  "09:00 AM",
  "10:30 AM",
  "12:00 PM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM",
];

// Indian Car Data for Dropdown Menus
const INDIAN_CAR_BRANDS: Record<string, string[]> = {
  "Tata Motors": [
    "Nexon",
    "Nexon EV",
    "Harrier",
    "Safari",
    "Punch",
    "Punch EV",
    "Altroz",
    "Tiago",
    "Tiago EV",
    "Tigor",
    "Tigor EV",
    "Curvv",
    "Curvv EV",
    "Sierra EV",
    "Hexa",
    "Sumo Gold",
    "Aria",
    "Bolt",
    "Zest",
    "Indica",
    "Indigo",
  ],
  "Mahindra & Mahindra": [
    "Thar 4x4",
    "Thar Roxx",
    "XUV700",
    "Scorpio-N",
    "Scorpio Classic",
    "XUV3XO",
    "Bolero",
    "Bolero Neo",
    "Bolero Neo Plus",
    "XUV400 EV",
    "Marazzo",
    "Alturas G4",
    "XUV500",
    "TUV300",
    "KUV100 NXT",
  ],
  "Maruti Suzuki": [
    "Swift",
    "Dzire",
    "Brezza",
    "Baleno",
    "Grand Vitara",
    "Jimny 4x4",
    "Fronx",
    "Ertiga",
    "XL6",
    "Invicto",
    "Alto K10",
    "S-Presso",
    "Celerio",
    "Ignis",
    "Ciaz",
    "WagonR",
    "Eeco",
    "S-Cross",
    "Ritz",
    "SX4",
    "Omni",
  ],
  "Hyundai India": [
    "Creta",
    "Creta N Line",
    "Venue",
    "Venue N Line",
    "Verna",
    "i20",
    "i20 N Line",
    "Tucson",
    "Alcazar",
    "Exter",
    "Aura",
    "Grand i10 Nios",
    "Ioniq 5",
    "Kona Electric",
    "Santa Fe",
    "Elantra",
    "Eon",
    "Santro",
  ],
  "Toyota Bharat": [
    "Fortuner",
    "Fortuner Legender",
    "Innova Crysta",
    "Innova Hycross",
    "Urban Cruiser Hyryder",
    "Glanza",
    "Hilux",
    "Rumion",
    "Camry Hybrid",
    "Land Cruiser 300",
    "Vellfire",
    "Etios",
    "Etios Liva",
    "Corolla Altis",
    "Yaris",
    "Prius",
  ],
  "Kia India": [
    "Seltos",
    "Sonet",
    "Carens",
    "Carnival",
    "EV6",
    "EV9",
    "Clavis",
  ],
  "Honda Cars India": [
    "City",
    "City e:HEV",
    "Elevate",
    "Amaze",
    "WR-V",
    "Jazz",
    "Civic",
    "CR-V",
    "Brio",
    "Mobilio",
    "Accord",
  ],
  "Skoda Auto India": [
    "Slavia",
    "Kushaq",
    "Kodiaq",
    "Superb",
    "Octavia",
    "Octavia vRS",
    "Kylaq",
    "Rapid",
    "Laura",
    "Fabia",
    "Yeti",
  ],
  "Volkswagen India": [
    "Virtus GT",
    "Virtus",
    "Taigun",
    "Tiguan",
    "Golf GTI",
    "Polo",
    "Vento",
    "Ameo",
    "Passat",
    "Jetta",
    "Cross Polo",
  ],
  "MG Motor India": [
    "Hector",
    "Hector Plus",
    "Astor",
    "ZS EV",
    "Comet EV",
    "Windsor EV",
    "Gloster",
    "Cyberster",
  ],
  "Renault India": [
    "Triber",
    "Kiger",
    "Kwid",
    "Duster",
    "Lodgy",
    "Pulse",
    "Scala",
    "Fluence",
  ],
  "Nissan India": [
    "Magnite",
    "X-Trail",
    "Kicks",
    "Sunny",
    "Terrano",
    "Micra",
    "GT-R",
  ],
  "Jeep India": [
    "Compass",
    "Meridian",
    "Wrangler 4x4",
    "Grand Cherokee",
  ],
  "Citroen India": [
    "C3",
    "C3 Aircross",
    "Basalt",
    "eC3",
    "C5 Aircross",
  ],
  "Force Motors": [
    "Gurkha 3-Door 4x4",
    "Gurkha 5-Door 4x4",
    "Trax Cruiser",
    "Force One",
  ],
  "Isuzu India": [
    "D-Max V-Cross",
    "MU-X",
    "D-Max Hi-Lander",
  ],
  "BMW India": [
    "3 Series Gran Limousine",
    "3 Series M340i",
    "5 Series",
    "7 Series",
    "M3 Competition",
    "M4 Competition",
    "M5",
    "X1",
    "X3",
    "X4",
    "X5",
    "X6",
    "X7",
    "XM",
    "i4",
    "i7",
    "iX",
    "iX1",
    "Z4 Roadster",
  ],
  "Mercedes-Benz India": [
    "A-Class Limousine",
    "C-Class",
    "E-Class",
    "S-Class",
    "CLA",
    "GLA",
    "GLB",
    "GLC",
    "GLE",
    "GLS",
    "G 63 AMG",
    "AMG GT",
    "EQS",
    "EQE SUV",
    "EQA",
    "Maybach S-Class",
    "Maybach GLS",
  ],
  "Audi India": [
    "A4",
    "A6",
    "A8 L",
    "Q3",
    "Q3 Sportback",
    "Q5",
    "Q7",
    "Q8",
    "S5 Sportback",
    "RS5",
    "RS Q8",
    "e-tron",
    "e-tron GT",
    "RS e-tron GT",
  ],
  "Jaguar Land Rover": [
    "Range Rover",
    "Range Rover Sport",
    "Range Rover Velar",
    "Range Rover Evoque",
    "Defender 90/110/130",
    "Discovery",
    "Discovery Sport",
    "Jaguar F-Pace",
    "F-Type",
    "I-Pace",
    "XE",
    "XF",
  ],
  "Volvo Cars India": [
    "XC40 Recharge",
    "EX30",
    "EX90",
    "XC60",
    "XC90",
    "S90",
    "C40 Recharge",
  ],
  "Porsche India": [
    "911 Carrera / GT3",
    "718 Cayman / Boxster",
    "Cayenne",
    "Cayenne Coupe",
    "Macan",
    "Macan EV",
    "Panamera",
    "Taycan",
  ],
  "Lexus India": [
    "ES 300h",
    "NX 350h",
    "RX 350h / 500h",
    "LM 350h",
    "LX 600",
    "LC 500h",
  ],
  "Mini India": [
    "Cooper 3-Door",
    "Cooper S",
    "Countryman",
    "Countryman EV",
    "Convertible",
    "JCW",
  ],
  "Exotic & Supercars": [
    "Lamborghini Urus / Huracan / Revuelto",
    "Ferrari Purosangue / 296 GTB / Roma",
    "Rolls-Royce Phantom / Ghost / Cullinan",
    "Bentley Continental GT / Flying Spur / Bentayga",
    "Aston Martin DB12 / Vantage / DBX 707",
  ],
  "Other / Custom": ["Custom Vehicle"],
};

const SERVICES_LIST = [
  { id: "ceramic", title: "9H Ceramic Coating (3-5 Year Shield)", price: "₹14,999" },
  { id: "ppf", title: "Full TPU Paint Protection Film (PPF)", price: "₹49,999" },
  { id: "tuning", title: "Stage 1 / Stage 2 ECU Performance Tuning", price: "₹19,999" },
  { id: "maintenance", title: "Comprehensive General Maintenance & Diagnostics", price: "₹2,499" },
  { id: "detailing", title: "Deep Interior Steam & Leather Care", price: "₹5,999" },
];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);

  // Vehicle State - WITHOUT Mileage option
  const [selectedBrand, setSelectedBrand] = useState("Tata Motors");
  const [selectedModel, setSelectedModel] = useState("Harrier");
  const [customModel, setCustomModel] = useState("");
  const [year, setYear] = useState("2024");
  const [plate, setPlate] = useState("");

  const [servicesList, setServicesList] = useState<any[]>(SERVICES_LIST);
  const [selectedService, setSelectedService] = useState(SERVICES_LIST[0]);
  const [selectedDate, setSelectedDate] = useState("2026-08-12");
  const [selectedTime, setSelectedTime] = useState("10:30 AM");

  useEffect(() => {
    fetchServices().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const formatted = data.map((s: any) => ({
          id: s.service_id || String(s.id),
          title: s.title,
          price: s.price_inr,
          desc: s.desc,
        }));
        setServicesList(formatted);
        setSelectedService(formatted[0]);
      }
    });
  }, []);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    const models = INDIAN_CAR_BRANDS[brand] || [];
    setSelectedModel(models[0] || "Custom Vehicle");
  };

  const handleNext = async () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setLoading(true);
      const finalModel = selectedBrand === "Other / Custom" && customModel ? customModel : selectedModel;
      const res = await createBooking({
        make: selectedBrand,
        model: finalModel,
        year: year,
        service_id: selectedService.id,
        service_name: selectedService.title,
        price_inr: selectedService.price,
        date: selectedDate,
        time_slot: selectedTime,
        client_name: contact.name || "Client",
        client_email: contact.email || "client@email.com",
        client_phone: contact.phone || "+91 98765 43210",
        notes: contact.notes,
      });
      setBookingRef(res.reference_id || `KB-${Math.floor(100000 + Math.random() * 900000)}`);
      setLoading(false);
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  if (submitted) {
    const finalModelName = selectedBrand === "Other / Custom" && customModel ? customModel : selectedModel;
    return (
      <div className="py-20 max-w-xl mx-auto px-margin-mobile text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center border-2 border-emerald-500">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <Badge variant="success">Booking Confirmed</Badge>
        <h1 className="font-heading text-3xl font-extrabold text-primary">
          Appointment Scheduled!
        </h1>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          Thank you, <span className="font-bold text-primary">{contact.name || "Valued Client"}</span>. Your service reservation for your <span className="font-bold text-primary">{year} {selectedBrand} {finalModelName}</span> on <span className="font-bold text-secondary">{selectedDate} at {selectedTime}</span> has been saved in our system.
        </p>

        <Card className="p-6 text-left space-y-3 bg-surface-container-low border border-slate-200 shadow-sm">
          <div className="text-xs font-bold uppercase text-slate-500 tracking-wider">Reservation Summary</div>
          <div className="flex justify-between text-sm py-1.5 border-b border-surface-container">
            <span className="text-on-surface-variant">Reference ID:</span>
            <span className="font-mono font-bold text-primary">{bookingRef}</span>
          </div>
          <div className="flex justify-between text-sm py-1.5 border-b border-surface-container">
            <span className="text-on-surface-variant">Service:</span>
            <span className="font-semibold text-secondary">{selectedService.title} ({selectedService.price})</span>
          </div>
          <div className="flex justify-between text-sm py-1.5 border-b border-surface-container">
            <span className="text-on-surface-variant">Location:</span>
            <span className="font-medium text-primary text-right max-w-[60%]">Near Seventh Parisar, Behind Jaguar Showroom, Sarkhej - Gandhinagar Highway, Gota, Ahmedabad, Gujarat 382481</span>
          </div>
          <div className="flex justify-between text-sm py-1.5 border-b border-surface-container">
            <span className="text-on-surface-variant">Contact Phone:</span>
            <span className="font-medium text-primary">{contact.phone || "+91 98765 43210"}</span>
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
        <Badge variant="secondary">Indian Garage Reservation</Badge>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-primary">
          Book Your KB Garage Appointment
        </h1>
        <p className="text-on-surface-variant text-sm sm:text-base">
          Select your Indian car model, chosen service package, and preferred time slot.
        </p>
      </div>

      {/* Stepper Progress */}
      <div className="max-w-2xl mx-auto">
        <Stepper steps={STEPS} currentStep={currentStep} onStepClick={(s) => s <= currentStep && setCurrentStep(s)} />
      </div>

      {/* Step Content Container */}
      <Card className="max-w-3xl mx-auto p-6 md:p-10 shadow-md border border-slate-200">
        <AnimatePresence mode="wait">
          {/* Step 1: Indian Car Dropdown Selection (No Mileage Option) */}
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
                <Car className="w-6 h-6 text-secondary" />
                <h2>Step 1: Indian Vehicle Details</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Brand Dropdown Menu */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Car Brand / Manufacturer *
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => handleBrandChange(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container-low border-2 border-slate-300 focus:border-secondary focus:outline-none rounded-lg text-sm font-semibold text-slate-900 shadow-sm"
                  >
                    {Object.keys(INDIAN_CAR_BRANDS).map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Model Dropdown Menu */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Car Name / Model Dropdown *
                  </label>
                  {selectedBrand === "Other / Custom" ? (
                    <input
                      type="text"
                      placeholder="e.g. Vintage Premier Padmini / Imported"
                      value={customModel}
                      onChange={(e) => setCustomModel(e.target.value)}
                      className="w-full px-4 py-3 bg-surface-container-low border-2 border-slate-300 focus:border-secondary focus:outline-none rounded-lg text-sm font-medium"
                    />
                  ) : (
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full px-4 py-3 bg-surface-container-low border-2 border-slate-300 focus:border-secondary focus:outline-none rounded-lg text-sm font-semibold text-slate-900 shadow-sm"
                    >
                      {(INDIAN_CAR_BRANDS[selectedBrand] || []).map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Model Year */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Model Year
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container-low border-2 border-slate-300 focus:border-secondary focus:outline-none rounded-lg text-sm font-medium text-slate-900"
                  >
                    {Array.from({ length: 25 }, (_, i) => 2026 - i).map((yr) => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Vehicle Plate / Registration (Optional) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Registration No. (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MH 02 CZ 4920"
                    value={plate}
                    onChange={(e) => setPlate(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container-low border-2 border-slate-300 focus:border-secondary focus:outline-none rounded-lg text-sm font-medium uppercase"
                  />
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-xs text-amber-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
                <span>
                  All services are optimized for Indian weather, high dust levels, and road conditions.
                </span>
              </div>
            </motion.div>
          )}

          {/* Step 2: Service Selection in INR */}
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
                <Wrench className="w-6 h-6 text-secondary" />
                <h2>Step 2: Select Service Discipline (INR Pricing)</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {servicesList.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedService(s)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedService.id === s.id
                        ? "border-secondary bg-secondary/5 ring-2 ring-secondary/20 shadow-md"
                        : "border-slate-200 bg-white hover:border-slate-400"
                      }`}
                  >
                    <div className="font-heading font-bold text-primary text-base">{s.title}</div>
                    {s.desc && <div className="text-xs text-slate-500 mt-1 line-clamp-2">{s.desc}</div>}
                    <div className="text-sm text-secondary font-black tracking-wider mt-2 flex items-center justify-between">
                      <span>{s.price}</span>
                      {selectedService.id === s.id && (
                        <span className="text-xs bg-secondary text-white px-2 py-0.5 rounded font-bold">Selected</span>
                      )}
                    </div>
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
                <CalendarIcon className="w-6 h-6 text-secondary" />
                <h2>Step 3: Appointment Date & Time Slot</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container-low border-2 border-slate-300 focus:border-secondary focus:outline-none rounded-lg text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Available Time Slots
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTime(t)}
                        className={`py-2.5 px-3 text-xs font-bold rounded-lg border transition-all ${selectedTime === t
                            ? "bg-secondary text-white border-secondary shadow-md scale-[1.02]"
                            : "bg-surface-container-low text-slate-800 border-slate-300 hover:border-secondary"
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
                <User className="w-6 h-6 text-secondary" />
                <h2>Step 4: Contact Information & Review</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Rajesh Sharma"
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-container-low border-2 border-slate-300 focus:border-secondary focus:outline-none rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Phone Number (+91) *</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-container-low border-2 border-slate-300 focus:border-secondary focus:outline-none rounded-lg text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  placeholder="rajesh.sharma@example.com"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className="w-full px-4 py-3 bg-surface-container-low border-2 border-slate-300 focus:border-secondary focus:outline-none rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Special Requirements / Notes</label>
                <textarea
                  rows={2}
                  placeholder="Any specific scratch, custom requirement, or pick-up instruction..."
                  value={contact.notes}
                  onChange={(e) => setContact({ ...contact, notes: e.target.value })}
                  className="w-full px-4 py-2.5 bg-surface-container-low border-2 border-slate-300 focus:border-secondary focus:outline-none rounded-lg text-sm"
                />
              </div>

              {/* Summary Box */}
              <div className="bg-slate-900 text-white p-5 rounded-xl space-y-2 border border-slate-800 shadow-md">
                <div className="text-xs font-bold uppercase tracking-widest text-secondary">Summary Confirmation</div>
                <div className="text-sm font-medium">
                  Vehicle: <span className="font-bold text-white">{year} {selectedBrand} {selectedBrand === "Other / Custom" ? customModel || "Custom" : selectedModel}</span>
                </div>
                <div className="text-sm font-medium">
                  Selected Service: <span className="font-bold text-secondary">{selectedService.title} ({selectedService.price})</span>
                </div>
                <div className="text-xs text-slate-400">
                  Appointment: <span className="text-white font-semibold">{selectedDate} @ {selectedTime}</span>
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
            disabled={currentStep === 1 || loading}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={handleNext}
            disabled={loading}
            className="flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-on-secondary px-6 font-bold uppercase tracking-wider"
          >
            <span>{loading ? "Processing..." : currentStep === 4 ? "Confirm & Book Slot" : "Continue"}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
