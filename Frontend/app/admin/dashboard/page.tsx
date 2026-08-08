"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Calendar,
  Wrench,
  Image as ImageIcon,
  Star,
  Mail,
  CheckCircle,
  Clock,
  Trash2,
  Edit,
  Plus,
  LogOut,
  RefreshCw,
  Search,
  Filter,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  fetchDashboardStats,
  fetchAllBookings,
  updateBookingStatus,
  deleteBookingApi,
  fetchServices,
  updateServiceApi,
  createServiceApi,
  deleteServiceApi,
} from "@/lib/api";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"bookings" | "services" | "gallery" | "reviews">("bookings");
  const [loading, setLoading] = useState(true);

  // Dashboard Stats State
  const [stats, setStats] = useState({
    total_bookings: 2,
    pending_bookings: 1,
    confirmed_bookings: 1,
    completed_bookings: 0,
    total_services: 5,
    total_reviews: 4,
    unread_messages: 0,
  });

  // Bookings State
  const [bookings, setBookings] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState("All");

  // Services State
  const [services, setServices] = useState<any[]>([]);
  const [editingService, setEditingService] = useState<any | null>(null);
  const [newService, setNewService] = useState({
    service_id: "",
    title: "",
    desc: "",
    price_inr: "₹",
    raw_price: 0,
    category: "detailing",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    badge: "",
  });
  const [showAddService, setShowAddService] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("kb_admin_token");
    if (!savedToken) {
      router.push("/admin/login");
    } else {
      setToken(savedToken);
    }
  }, [router]);

  useEffect(() => {
    loadData();
  }, [token, statusFilter]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (token) {
        const statsRes = await fetchDashboardStats(token).catch(() => stats);
        setStats(statsRes);

        const bookingsRes = await fetchAllBookings(token, statusFilter).catch(() => sampleBookings);
        setBookings(bookingsRes);
      }
      const servicesRes = await fetchServices();
      setServices(servicesRes);
    } catch (err) {
      console.warn("Using local state for dashboard:", err);
      setBookings(sampleBookings);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId: number, newStatus: string) => {
    try {
      if (token) {
        await updateBookingStatus(token, bookingId, newStatus);
      }
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
      );
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleDeleteBooking = async (bookingId: number) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      if (token) {
        await deleteBookingApi(token, bookingId);
      }
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    } catch (err) {
      alert("Failed to delete booking");
    }
  };

  const handleUpdateServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    try {
      if (token) {
        await updateServiceApi(token, editingService.id, editingService);
      }
      setServices((prev) =>
        prev.map((s) => (s.id === editingService.id ? editingService : s))
      );
      setEditingService(null);
      alert("Service price and details updated successfully!");
    } catch (err) {
      alert("Failed to update service");
    }
  };

  const handleCreateServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (token) {
        await createServiceApi(token, newService);
      }
      setServices((prev) => [...prev, { ...newService, id: Date.now() }]);
      setShowAddService(false);
      alert("New service added successfully!");
    } catch (err) {
      alert("Failed to add service");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("kb_admin_token");
    setToken(null);
    router.push("/admin/login");
  };

  if (!token) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-600">Verifying administrative credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-[1400px] mx-auto px-margin-mobile md:px-margin-desktop space-y-8">
      {/* Top Header */}
      <div className="bg-slate-900 text-white p-6 md:p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 shrink-0">
            <Image src="/logo.svg" alt="KB Garage Logo" fill className="object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-2xl md:text-3xl font-black text-white tracking-tight">
                Owner Administration Panel
              </h1>
              <Badge variant="secondary">India Garage</Badge>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Manage appointments, edit service prices in INR (₹), update car gallery, and oversee client inquiries.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={loadData} className="flex items-center gap-2 border-slate-700 text-slate-200">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </Button>
          <Button variant="primary" size="sm" onClick={handleLogout} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-5 border border-slate-200 bg-white shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase text-slate-500">Total Bookings</div>
            <div className="text-3xl font-black text-primary mt-1">{stats.total_bookings || bookings.length}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-5 border border-slate-200 bg-white shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase text-slate-500">Active Services</div>
            <div className="text-3xl font-black text-emerald-600 mt-1">{services.length}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Wrench className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-5 border border-slate-200 bg-white shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase text-slate-500">Pending Slots</div>
            <div className="text-3xl font-black text-amber-500 mt-1">{stats.pending_bookings}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-5 border border-slate-200 bg-white shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase text-slate-500">Currency</div>
            <div className="text-2xl font-black text-primary mt-1">₹ (INR)</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
            ₹
          </div>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab("bookings")}
          className={`px-5 py-3 font-heading font-bold text-sm rounded-t-xl transition-all flex items-center gap-2 ${
            activeTab === "bookings"
              ? "bg-slate-900 text-white shadow-md"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Bookings & Appointments ({bookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("services")}
          className={`px-5 py-3 font-heading font-bold text-sm rounded-t-xl transition-all flex items-center gap-2 ${
            activeTab === "services"
              ? "bg-slate-900 text-white shadow-md"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Manage Services & Prices (INR)</span>
        </button>

        <button
          onClick={() => setActiveTab("gallery")}
          className={`px-5 py-3 font-heading font-bold text-sm rounded-t-xl transition-all flex items-center gap-2 ${
            activeTab === "gallery"
              ? "bg-slate-900 text-white shadow-md"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Indian Car Gallery Projects</span>
        </button>
      </div>

      {/* TAB 1: BOOKINGS MANAGEMENT */}
      {activeTab === "bookings" && (
        <Card className="p-6 border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="font-heading text-xl font-extrabold text-primary">Appointment Reservations</h2>
              <p className="text-xs text-slate-500">View and update live customer service bookings.</p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2">
              {["All", "Confirmed", "Pending", "Completed", "Cancelled"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    statusFilter === st
                      ? "bg-secondary text-white border-secondary"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase text-[11px] font-bold tracking-wider border-b border-slate-200">
                  <th className="p-3">Ref ID</th>
                  <th className="p-3">Client Name</th>
                  <th className="p-3">Car Vehicle</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Price (INR)</th>
                  <th className="p-3">Date & Time</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-mono font-bold text-primary">{b.reference_id}</td>
                    <td className="p-3">
                      <div className="font-semibold text-slate-900">{b.client_name}</div>
                      <div className="text-xs text-slate-500">{b.client_phone || b.client_email}</div>
                    </td>
                    <td className="p-3 font-medium text-slate-800">
                      {b.year} {b.make} <span className="font-bold text-primary">{b.model}</span>
                    </td>
                    <td className="p-3 text-xs font-medium text-slate-700">{b.service_name}</td>
                    <td className="p-3 font-bold text-secondary">{b.price_inr}</td>
                    <td className="p-3 text-xs text-slate-600 font-medium">
                      {b.date} <br />
                      <span className="text-slate-400">{b.time_slot}</span>
                    </td>
                    <td className="p-3">
                      <select
                        value={b.status}
                        onChange={(e) => handleStatusChange(b.id, e.target.value)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border focus:outline-none ${
                          b.status === "Confirmed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                            : b.status === "Pending"
                            ? "bg-amber-50 text-amber-700 border-amber-300"
                            : b.status === "Completed"
                            ? "bg-blue-50 text-blue-700 border-blue-300"
                            : "bg-red-50 text-red-700 border-red-300"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeleteBooking(b.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Booking"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB 2: SERVICES & PRICE MANAGEMENT (INR) */}
      {activeTab === "services" && (
        <Card className="p-6 border border-slate-200 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-heading text-xl font-extrabold text-primary">Services & Pricing Architecture</h2>
              <p className="text-xs text-slate-500">Edit titles, descriptions, and prices in INR (₹).</p>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowAddService(!showAddService)}
              className="flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-on-secondary"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Service</span>
            </Button>
          </div>

          {/* Add New Service Form */}
          {showAddService && (
            <form onSubmit={handleCreateServiceSubmit} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
              <h3 className="font-heading text-sm font-bold text-slate-900">Create New Service Offering</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Service ID (e.g. ppf_full)"
                  required
                  value={newService.service_id}
                  onChange={(e) => setNewService({ ...newService, service_id: e.target.value })}
                  className="px-3 py-2 border rounded text-xs"
                />
                <input
                  type="text"
                  placeholder="Service Title"
                  required
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                  className="px-3 py-2 border rounded text-xs"
                />
                <input
                  type="text"
                  placeholder="Price in INR (e.g. ₹29,999)"
                  required
                  value={newService.price_inr}
                  onChange={(e) => setNewService({ ...newService, price_inr: e.target.value })}
                  className="px-3 py-2 border rounded text-xs font-bold"
                />
              </div>
              <textarea
                placeholder="Detailed description..."
                value={newService.desc}
                onChange={(e) => setNewService({ ...newService, desc: e.target.value })}
                className="w-full px-3 py-2 border rounded text-xs"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowAddService(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save Service
                </Button>
              </div>
            </form>
          )}

          {/* Edit Service Modal / Form inline */}
          {editingService && (
            <form onSubmit={handleUpdateServiceSubmit} className="p-4 bg-amber-50/80 rounded-xl border-2 border-amber-300 space-y-4">
              <h3 className="font-heading text-sm font-bold text-amber-900">Edit Service: {editingService.title}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase">Title</label>
                  <input
                    type="text"
                    value={editingService.title}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase">Price in INR (₹)</label>
                  <input
                    type="text"
                    value={editingService.price_inr}
                    onChange={(e) => setEditingService({ ...editingService, price_inr: e.target.value })}
                    className="w-full px-3 py-2 border rounded text-xs font-bold text-secondary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase">Description</label>
                <textarea
                  rows={2}
                  value={editingService.desc}
                  onChange={(e) => setEditingService({ ...editingService, desc: e.target.value })}
                  className="w-full px-3 py-2 border rounded text-xs"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" type="button" onClick={() => setEditingService(null)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" className="bg-secondary text-white">
                  Save Changes
                </Button>
              </div>
            </form>
          )}

          {/* Services List Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((s) => (
              <div key={s.id || s.service_id} className="p-4 border border-slate-200 rounded-xl flex items-center justify-between gap-4 bg-white shadow-sm">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-primary text-base">{s.title}</span>
                    {s.badge && <Badge variant="secondary">{s.badge}</Badge>}
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2">{s.desc}</p>
                  <div className="text-sm font-black text-secondary">{s.price_inr}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingService(s)}
                    className="p-2 text-slate-600 hover:text-secondary hover:bg-secondary/10 rounded-lg transition-colors"
                    title="Edit Service & Price"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 3: INDIAN CAR GALLERY PROJECTS */}
      {activeTab === "gallery" && (
        <Card className="p-6 border border-slate-200 space-y-6">
          <div>
            <h2 className="font-heading text-xl font-extrabold text-primary">Indian Car Showcase Projects</h2>
            <p className="text-xs text-slate-500">Gallery of Tata, Mahindra, Hyundai, Maruti, Toyota and Volkswagen transformations.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "Tata Nexon Dark Edition", category: "Ceramic Coating", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/2023_Tata_Nexon_XZA%2B_front_view.jpg/1280px-2023_Tata_Nexon_XZA%2B_front_view.jpg" },
              { title: "Mahindra Thar 4x4", category: "ECU Tuning", img: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Mahindra_Thar_2.5_CRDe_2011.jpg" },
              { title: "Hyundai Creta SX(O)", category: "Full PPF Armor", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/2020_Hyundai_Creta_1.5_LX_GS_%28Chile%29_front_view.jpg/1280px-2020_Hyundai_Creta_1.5_LX_GS_%28Chile%29_front_view.jpg" },
            ].map((g, idx) => (
              <div key={idx} className="relative rounded-xl overflow-hidden border border-slate-200 group">
                <div className="h-44 relative">
                  <Image src={g.img} alt={g.title} fill className="object-cover" />
                </div>
                <div className="p-3 bg-white">
                  <div className="font-heading font-bold text-sm text-primary">{g.title}</div>
                  <div className="text-xs text-secondary font-semibold">{g.category}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

const sampleBookings = [
  {
    id: 1,
    reference_id: "KB-849201",
    make: "Tata",
    model: "Harrier Dark Edition",
    year: "2024",
    service_id: "ceramic",
    service_name: "9H Ceramic Coating (3-5 Year Shield)",
    price_inr: "₹14,999",
    date: "2026-08-12",
    time_slot: "10:30 AM",
    client_name: "Rajesh Sharma",
    client_email: "rajesh.sharma@example.com",
    client_phone: "+91 98765 12345",
    notes: "Bonnet swirl removal requested",
    status: "Confirmed",
  },
  {
    id: 2,
    reference_id: "KB-392019",
    make: "Mahindra",
    model: "Thar 4x4",
    year: "2023",
    service_id: "tuning",
    service_name: "Stage 1 / Stage 2 ECU Performance Tuning",
    price_inr: "₹19,999",
    date: "2026-08-14",
    time_slot: "02:00 PM",
    client_name: "Ananya Verma",
    client_email: "ananya.v@outlook.com",
    client_phone: "+91 98200 54321",
    notes: "Low end torque tuning",
    status: "Pending",
  },
];
