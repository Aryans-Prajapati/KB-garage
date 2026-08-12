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
  BookOpen,
  CheckCircle,
  Clock,
  Trash2,
  Edit,
  Plus,
  LogOut,
  RefreshCw,
  Eye,
  CheckCircle2,
  DollarSign,
  Upload,
  Users,
  UserPlus,
  ShieldCheck,
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
  fetchGalleryItems,
  createGalleryItemApi,
  updateGalleryItemApi,
  deleteGalleryItemApi,
  fetchBlogPosts,
  createBlogPostApi,
  updateBlogPostApi,
  deleteBlogPostApi,
  fetchReviews,
  createReviewApi,
  updateReviewApi,
  deleteReviewApi,
  fetchAllContactMessages,
  deleteContactMessageApi,
  uploadImageApi,
  fetchAdminUsers,
  createAdminUser,
  deleteAdminUser,
} from "@/lib/api";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "bookings" | "services" | "gallery" | "blogs" | "reviews" | "contact" | "users"
  >("bookings");
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Dashboard Stats State
  const [stats, setStats] = useState<any>({
    total_bookings: 0,
    pending_bookings: 0,
    confirmed_bookings: 0,
    completed_bookings: 0,
    total_revenue_formatted: "₹0",
    active_services: 0,
    gallery_items: 0,
    total_blogs: 0,
    total_reviews: 0,
    contact_messages: 0,
    unread_messages: 0,
  });

  // Data States
  const [bookings, setBookings] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [services, setServices] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [adminUsers, setAdminUsers] = useState<any[]>([]);

  // Admin User Form State
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Modal / Form States
  const [editingService, setEditingService] = useState<any | null>(null);
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({
    service_id: "",
    title: "",
    desc: "",
    price_inr: "₹",
    raw_price: 0,
    category: "detailing",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    badge: "New Option",
    is_active: true,
  });

  // Gallery Modal
  const [editingGallery, setEditingGallery] = useState<any | null>(null);
  const [showAddGallery, setShowAddGallery] = useState(false);
  const [newGallery, setNewGallery] = useState({
    title: "",
    category: "ceramic",
    badge: "KB Standard",
    desc: "",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Tata_Nexon_EV_in_Hyderabad_02.jpg/1280px-Tata_Nexon_EV_in_Hyderabad_02.jpg",
  });

  // Blog Modal
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    category: "Detailing Guide",
    date_str: "August 2026",
    read_time: "5 min read",
    desc: "",
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80",
  });

  // Review Modal
  const [editingReview, setEditingReview] = useState<any | null>(null);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
    car_model: "",
    service_name: "",
  });

  useEffect(() => {
    const savedToken = localStorage.getItem("kb_admin_token");
    if (!savedToken) {
      router.push("/admin/login");
    } else {
      setToken(savedToken);
    }
  }, [router]);

  useEffect(() => {
    if (token) {
      loadData();
    }
  }, [token, statusFilter]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (token) {
        const statsRes = await fetchDashboardStats(token);
        setStats(statsRes);

        const bookingsRes = await fetchAllBookings(token, statusFilter);
        setBookings(bookingsRes);

        const contactsRes = await fetchAllContactMessages(token);
        setContacts(contactsRes);

        const usersRes = await fetchAdminUsers(token);
        setAdminUsers(usersRes);
      }

      const [servData, galData, blogData, revData] = await Promise.all([
        fetchServices(),
        fetchGalleryItems(),
        fetchBlogPosts(),
        fetchReviews(),
      ]);

      setServices(servData);
      setGallery(galData);
      setBlogs(blogData);
      setReviews(revData);
    } catch (err) {
      console.warn("Data loading issue:", err);
    } finally {
      setLoading(false);
    }
  };

  // ADMIN USER HANDLERS
  const handleCreateAdminUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (token) {
        const res = await createAdminUser(token, newUser);
        alert(res.detail || "New admin user created successfully!");
        setNewUser({ username: "", email: "", password: "" });
        setShowAddUser(false);
        const updatedUsers = await fetchAdminUsers(token);
        setAdminUsers(updatedUsers);
      }
    } catch (err: any) {
      alert(err.message || "Failed to create admin user");
    }
  };

  const handleDeleteAdminUser = async (userId: number) => {
    if (!confirm("Are you sure you want to remove this admin user?")) return;
    try {
      if (token) {
        const res = await deleteAdminUser(token, userId);
        alert(res.detail || "User removed.");
        setAdminUsers((prev) => prev.filter((u) => u.id !== userId));
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete user");
    }
  };

  // FILE UPLOAD HANDLER FOR GALLERY / SERVICES
  const handleFileUpload = async (file: File, isEdit = false) => {
    if (!file) return;
    setUploadingImage(true);
    try {
      const res = await uploadImageApi(token || "", file);
      if (res && res.url) {
        if (isEdit && editingGallery) {
          setEditingGallery((prev: any) => ({ ...prev, image: res.url }));
        } else {
          setNewGallery((prev) => ({ ...prev, image: res.url }));
        }
        alert("Image uploaded successfully!");
      }
    } catch (err) {
      alert("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  // BOOKINGS HANDLERS
  const handleStatusChange = async (bookingId: number, newStatus: string) => {
    try {
      if (token) {
        await updateBookingStatus(token, bookingId, newStatus);
      }
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
      );
      alert(`Booking #${bookingId} status updated to ${newStatus}`);
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleDeleteBooking = async (bookingId: number) => {
    if (!confirm("Are you sure you want to delete this booking record?")) return;
    try {
      if (token) {
        await deleteBookingApi(token, bookingId);
      }
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      alert("Booking deleted successfully.");
      if (token) fetchDashboardStats(token).then(setStats);
    } catch (err: any) {
      alert(err.message || "Failed to delete booking");
    }
  };

  // SERVICES HANDLERS
  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (token) {
        const res = await createServiceApi(token, newService);
        setServices((prev) => [res, ...prev]);
        fetchDashboardStats(token).then(setStats);
      }
      setShowAddService(false);
      alert("Service created successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to create service");
    }
  };

  const handleUpdateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    try {
      if (token) {
        const res = await updateServiceApi(token, editingService.id, editingService);
        setServices((prev) => prev.map((s) => (s.id === editingService.id ? res : s)));
      }
      setEditingService(null);
      alert("Service updated successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to update service");
    }
  };

  const handleDeleteService = async (serviceId: number) => {
    if (!confirm("Are you sure you want to remove this service?")) return;
    try {
      if (token) {
        await deleteServiceApi(token, serviceId);
      }
      setServices((prev) => prev.filter((s) => s.id !== serviceId));
      alert("Service removed successfully.");
      if (token) fetchDashboardStats(token).then(setStats);
    } catch (err: any) {
      alert(err.message || "Failed to delete service");
    }
  };

  // GALLERY HANDLERS
  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (token) {
        const res = await createGalleryItemApi(token, newGallery);
        setGallery((prev) => [res, ...prev]);
        fetchDashboardStats(token).then(setStats);
      }
      setShowAddGallery(false);
      alert("Gallery project added successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to add gallery project");
    }
  };

  const handleUpdateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery) return;
    try {
      if (token) {
        const res = await updateGalleryItemApi(token, editingGallery.id, editingGallery);
        setGallery((prev) => prev.map((g) => (g.id === editingGallery.id ? res : g)));
      }
      setEditingGallery(null);
      alert("Gallery project updated successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to update gallery item");
    }
  };

  const handleDeleteGallery = async (id: number) => {
    if (!confirm("Delete this gallery item?")) return;
    try {
      if (token) {
        await deleteGalleryItemApi(token, id);
      }
      setGallery((prev) => prev.filter((g) => g.id !== id));
      alert("Gallery item deleted.");
      if (token) fetchDashboardStats(token).then(setStats);
    } catch (err: any) {
      alert(err.message || "Failed to delete gallery item");
    }
  };

  // BLOG HANDLERS
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (token) {
        const res = await createBlogPostApi(token, newBlog);
        setBlogs((prev) => [res, ...prev]);
        fetchDashboardStats(token).then(setStats);
      }
      setShowAddBlog(false);
      alert("Blog post created!");
    } catch (err: any) {
      alert(err.message || "Failed to create blog post");
    }
  };

  const handleUpdateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;
    try {
      if (token) {
        const res = await updateBlogPostApi(token, editingBlog.id, editingBlog);
        setBlogs((prev) => prev.map((b) => (b.id === editingBlog.id ? res : b)));
      }
      setEditingBlog(null);
      alert("Blog post updated!");
    } catch (err: any) {
      alert(err.message || "Failed to update blog post");
    }
  };

  const handleDeleteBlog = async (id: number) => {
    if (!confirm("Delete this blog article?")) return;
    try {
      if (token) {
        await deleteBlogPostApi(token, id);
      }
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      alert("Blog article deleted.");
      if (token) fetchDashboardStats(token).then(setStats);
    } catch (err: any) {
      alert(err.message || "Failed to delete blog post");
    }
  };

  // REVIEWS HANDLERS
  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (token) {
        const res = await createReviewApi(token, newReview);
        setReviews((prev) => [res, ...prev]);
        fetchDashboardStats(token).then(setStats);
      }
      setShowAddReview(false);
      alert("Customer review added!");
    } catch (err: any) {
      alert(err.message || "Failed to add review");
    }
  };

  const handleUpdateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;
    try {
      if (token) {
        const res = await updateReviewApi(token, editingReview.id, editingReview);
        setReviews((prev) => prev.map((r) => (r.id === editingReview.id ? res : r)));
      }
      setEditingReview(null);
      alert("Review updated!");
    } catch (err: any) {
      alert(err.message || "Failed to update review");
    }
  };

  const handleDeleteReview = async (id: number) => {
    if (!confirm("Delete this review?")) return;
    try {
      if (token) {
        await deleteReviewApi(token, id);
      }
      setReviews((prev) => prev.filter((r) => r.id !== id));
      alert("Review deleted.");
      if (token) fetchDashboardStats(token).then(setStats);
    } catch (err: any) {
      alert(err.message || "Failed to delete review");
    }
  };

  // CONTACT HANDLERS
  const handleDeleteContact = async (id: number) => {
    if (!confirm("Delete this contact message?")) return;
    try {
      if (token) {
        await deleteContactMessageApi(token, id);
      }
      setContacts((prev) => prev.filter((c) => c.id !== id));
      alert("Contact message deleted.");
      if (token) fetchDashboardStats(token).then(setStats);
    } catch (err: any) {
      alert(err.message || "Failed to delete contact message");
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
    <div className="py-4 sm:py-8 max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-4 sm:p-6 md:p-8 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl border border-slate-800">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0">
            <Image src="/logo.svg" alt="KB Garage Logo" fill className="object-contain" />
          </div>
          <div>
            <h1 className="font-heading text-lg sm:text-2xl md:text-3xl font-black text-white tracking-tight">
              KB Garage Admin Portal
            </h1>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1 leading-snug">
              Appointments, Services, Gallery, Blogs, Reviews & Enquiries. Transferred to <span className="text-secondary font-bold">rikinp0102@gmail.com</span>.
            </p>
          </div>
        </div>

        <div className="w-full sm:w-auto flex items-center justify-end">
          <Button variant="primary" size="sm" onClick={handleLogout} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl text-xs font-bold">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-1.5 overflow-x-auto pb-2 scrollbar-none -mx-3 px-3 sm:mx-0 sm:px-0">
        {[
          { id: "bookings", label: `Bookings (${bookings.length})`, icon: Calendar },
          { id: "services", label: `Services (${services.length})`, icon: Wrench },
          { id: "gallery", label: `Gallery (${gallery.length})`, icon: ImageIcon },
          { id: "blogs", label: `Blogs (${blogs.length})`, icon: BookOpen },
          { id: "reviews", label: `Reviews (${reviews.length})`, icon: Star },
          { id: "contact", label: `Messages (${contacts.length})`, icon: Mail },
          { id: "users", label: `Admin Users (${adminUsers.length})`, icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 sm:px-4 py-2.5 font-heading font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: BOOKINGS */}
      {activeTab === "bookings" && (
        <Card className="p-4 sm:p-6 border border-slate-200 space-y-5 rounded-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h2 className="font-heading text-lg sm:text-xl font-extrabold text-primary">Appointment Reservations</h2>
              <p className="text-xs text-slate-500 mt-0.5">Real-time appointments dispatched to rikinp0102@gmail.com.</p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {["All", "Confirmed", "Pending", "Completed", "Cancelled"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-lg border transition-all ${
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

          {/* MOBILE CARDS VIEW (For small screens) */}
          <div className="block lg:hidden space-y-3">
            {bookings.length === 0 ? (
              <div className="p-6 text-center text-slate-500 text-xs bg-slate-50 rounded-xl border border-dashed border-slate-200">
                No booking records found for filter "{statusFilter}".
              </div>
            ) : (
              bookings.map((b) => (
                <div key={b.id} className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="font-mono font-bold text-xs text-primary bg-slate-100 px-2 py-0.5 rounded">
                      {b.reference_id}
                    </span>
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
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Client</span>
                      <div className="font-semibold text-slate-900">{b.client_name}</div>
                      <div className="text-[11px] text-slate-500 truncate">{b.client_phone || b.client_email}</div>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Vehicle</span>
                      <div className="font-medium text-slate-800">
                        {b.year} {b.make} <span className="font-bold text-primary">{b.model}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Service</span>
                      <div className="font-medium text-slate-700">{b.service_name}</div>
                      <div className="font-bold text-secondary">{b.price_inr}</div>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Date & Time</span>
                      <div className="text-slate-700 font-medium">{b.date}</div>
                      <div className="text-slate-400 text-[11px]">{b.time_slot}</div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => handleDeleteBooking(b.id)}
                      className="px-2.5 py-1 text-xs text-red-600 bg-red-50 hover:bg-red-100 rounded-lg font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* DESKTOP TABLE VIEW (For larger screens) */}
          <div className="hidden lg:block overflow-x-auto rounded-xl border border-slate-200">
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
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-6 text-center text-slate-500 text-xs">
                      No booking records found for filter "{statusFilter}".
                    </td>
                  </tr>
                ) : (
                  bookings.map((b) => (
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
                          <option value="In Progress">In Progress</option>
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB 2: SERVICES MANAGEMENT */}
      {activeTab === "services" && (
        <Card className="p-6 border border-slate-200 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-heading text-xl font-extrabold text-primary">Services & Pricing Architecture</h2>
              <p className="text-xs text-slate-500">Add, edit prices, descriptions, and active status for service offerings.</p>
            </div>
            <Button variant="primary" size="sm" onClick={() => setShowAddService(!showAddService)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>Add New Service</span>
            </Button>
          </div>

          {/* Add Service Modal */}
          {showAddService && (
            <form onSubmit={handleCreateService} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
              <h3 className="font-heading text-sm font-bold text-slate-900">Add New Service</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Service ID (e.g. ceramic_pro)"
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
                placeholder="Description..."
                value={newService.desc}
                onChange={(e) => setNewService({ ...newService, desc: e.target.value })}
                className="w-full px-3 py-2 border rounded text-xs"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowAddService(false)}>Cancel</Button>
                <Button variant="primary" size="sm" type="submit">Save Service</Button>
              </div>
            </form>
          )}

          {/* Edit Service Form */}
          {editingService && (
            <form onSubmit={handleUpdateService} className="p-4 bg-amber-50 rounded-xl border-2 border-amber-300 space-y-4">
              <h3 className="font-heading text-sm font-bold text-amber-900">Edit Service #{editingService.id}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="px-3 py-2 border rounded text-xs font-bold"
                />
                <input
                  type="text"
                  value={editingService.price_inr}
                  onChange={(e) => setEditingService({ ...editingService, price_inr: e.target.value })}
                  className="px-3 py-2 border rounded text-xs font-bold text-secondary"
                />
              </div>
              <textarea
                rows={2}
                value={editingService.desc}
                onChange={(e) => setEditingService({ ...editingService, desc: e.target.value })}
                className="w-full px-3 py-2 border rounded text-xs"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" type="button" onClick={() => setEditingService(null)}>Cancel</Button>
                <Button variant="primary" size="sm" type="submit">Update Service</Button>
              </div>
            </form>
          )}

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
                  <button onClick={() => setEditingService(s)} className="p-2 text-slate-600 hover:text-secondary hover:bg-secondary/10 rounded-lg">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDeleteService(s.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 3: GALLERY MANAGEMENT */}
      {activeTab === "gallery" && (
        <Card className="p-6 border border-slate-200 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-heading text-xl font-extrabold text-primary">Car Showcase Gallery Projects</h2>
              <p className="text-xs text-slate-500">Add, edit, or upload photo transformations directly from your device.</p>
            </div>
            <Button variant="primary" size="sm" onClick={() => setShowAddGallery(!showAddGallery)}>
              <Plus className="w-4 h-4 mr-1" /> Add Project
            </Button>
          </div>

          {/* ADD GALLERY ITEM WITH DIRECT UPLOAD BUTTON */}
          {showAddGallery && (
            <form onSubmit={handleCreateGallery} className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
              <h3 className="font-heading text-sm font-bold text-slate-900">Add New Gallery Project</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Car / Project Title (e.g. Tata Nexon Dark Edition)"
                  required
                  value={newGallery.title}
                  onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                  className="px-3 py-2 border rounded text-xs"
                />
                <input
                  type="text"
                  placeholder="Badge (e.g. 5-Year Ceramic Shield)"
                  value={newGallery.badge}
                  onChange={(e) => setNewGallery({ ...newGallery, badge: e.target.value })}
                  className="px-3 py-2 border rounded text-xs"
                />
              </div>

              {/* DIRECT PHOTO UPLOAD BUTTON & URL INPUT */}
              <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
                <label className="block text-[11px] font-bold text-slate-700 uppercase">
                  Project Photo (Upload direct file or paste URL)
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <label className="cursor-pointer px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm border border-slate-700 transition-colors">
                    <Upload className="w-4 h-4 text-secondary" />
                    <span>{uploadingImage ? "Uploading..." : "Upload Image File"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileUpload(e.target.files[0], false);
                        }
                      }}
                    />
                  </label>
                  <span className="text-xs text-slate-400 font-bold text-center">OR</span>
                  <input
                    type="text"
                    placeholder="https://..."
                    required
                    value={newGallery.image}
                    onChange={(e) => setNewGallery({ ...newGallery, image: e.target.value })}
                    className="flex-1 px-3 py-2 border rounded text-xs"
                  />
                </div>
                {newGallery.image && (
                  <div className="flex items-center gap-3 pt-2">
                    <div className="relative h-20 w-32 rounded-md overflow-hidden border border-slate-200 shrink-0">
                      <Image src={newGallery.image} alt="Preview" fill className="object-cover" />
                    </div>
                    <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Image ready for project
                    </span>
                  </div>
                )}
              </div>

              <textarea
                placeholder="Description of transformation..."
                value={newGallery.desc}
                onChange={(e) => setNewGallery({ ...newGallery, desc: e.target.value })}
                className="w-full px-3 py-2 border rounded text-xs"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowAddGallery(false)}>Cancel</Button>
                <Button variant="primary" size="sm" type="submit">Save Project</Button>
              </div>
            </form>
          )}

          {/* EDIT GALLERY ITEM WITH DIRECT UPLOAD BUTTON */}
          {editingGallery && (
            <form onSubmit={handleUpdateGallery} className="p-5 bg-amber-50 rounded-xl border-2 border-amber-300 space-y-4">
              <h3 className="text-xs font-bold text-amber-900">Edit Gallery Project #{editingGallery.id}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={editingGallery.title}
                  onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })}
                  className="px-3 py-2 border rounded text-xs font-bold"
                />
                <input
                  type="text"
                  value={editingGallery.badge || ""}
                  onChange={(e) => setEditingGallery({ ...editingGallery, badge: e.target.value })}
                  className="px-3 py-2 border rounded text-xs"
                />
              </div>

              <div className="p-3 bg-white border border-amber-200 rounded-lg space-y-2">
                <label className="block text-[11px] font-bold text-slate-700 uppercase">
                  Update Project Photo (Upload direct file or paste URL)
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <label className="cursor-pointer px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm border border-slate-700 transition-colors">
                    <Upload className="w-4 h-4 text-secondary" />
                    <span>{uploadingImage ? "Uploading..." : "Upload New Image File"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileUpload(e.target.files[0], true);
                        }
                      }}
                    />
                  </label>
                  <span className="text-xs text-slate-400 font-bold text-center">OR</span>
                  <input
                    type="text"
                    value={editingGallery.image}
                    onChange={(e) => setEditingGallery({ ...editingGallery, image: e.target.value })}
                    className="flex-1 px-3 py-2 border rounded text-xs"
                  />
                </div>
                {editingGallery.image && (
                  <div className="relative h-24 w-36 rounded-md overflow-hidden border border-slate-200 mt-2">
                    <Image src={editingGallery.image} alt="Preview" fill className="object-cover" />
                  </div>
                )}
              </div>

              <textarea
                rows={2}
                value={editingGallery.desc}
                onChange={(e) => setEditingGallery({ ...editingGallery, desc: e.target.value })}
                className="w-full px-3 py-2 border rounded text-xs"
              />

              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" type="button" onClick={() => setEditingGallery(null)}>Cancel</Button>
                <Button variant="primary" size="sm" type="submit" className="bg-secondary text-white">Save Changes</Button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {gallery.map((g) => (
              <div key={g.id} className="border rounded-xl overflow-hidden bg-white shadow-sm">
                <div className="h-40 relative bg-slate-100">
                  <Image src={g.image} alt={g.title} fill className="object-cover" />
                </div>
                <div className="p-3 space-y-1">
                  <div className="font-bold text-sm text-primary">{g.title}</div>
                  <p className="text-xs text-slate-500 line-clamp-2">{g.desc}</p>
                  <div className="flex justify-between items-center pt-2">
                    <Badge variant="secondary">{g.badge || g.category}</Badge>
                    <div className="flex gap-1">
                      <button onClick={() => setEditingGallery(g)} className="p-1.5 text-slate-600 hover:text-secondary hover:bg-secondary/10 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteGallery(g.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 4: BLOGS MANAGEMENT */}
      {activeTab === "blogs" && (
        <Card className="p-6 border border-slate-200 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-heading text-xl font-extrabold text-primary">Automotive Insights & Articles</h2>
              <p className="text-xs text-slate-500">Publish or delete technical guides and detailing breakdowns.</p>
            </div>
            <Button variant="primary" size="sm" onClick={() => setShowAddBlog(!showAddBlog)}>
              <Plus className="w-4 h-4 mr-1" /> New Blog Article
            </Button>
          </div>

          {showAddBlog && (
            <form onSubmit={handleCreateBlog} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <input
                type="text"
                placeholder="Article Title"
                required
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                className="w-full px-3 py-2 border rounded text-xs"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Category (e.g. Detailing Guide)"
                  value={newBlog.category}
                  onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                  className="px-3 py-2 border rounded text-xs"
                />
                <input
                  type="text"
                  placeholder="Read Time (e.g. 5 min read)"
                  value={newBlog.read_time}
                  onChange={(e) => setNewBlog({ ...newBlog, read_time: e.target.value })}
                  className="px-3 py-2 border rounded text-xs"
                />
              </div>
              <textarea
                placeholder="Article description..."
                value={newBlog.desc}
                onChange={(e) => setNewBlog({ ...newBlog, desc: e.target.value })}
                className="w-full px-3 py-2 border rounded text-xs"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowAddBlog(false)}>Cancel</Button>
                <Button variant="primary" size="sm" type="submit">Publish Article</Button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {blogs.map((b) => (
              <div key={b.id} className="p-4 border rounded-xl bg-white flex items-center justify-between gap-4 shadow-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">{b.title}</span>
                    <Badge variant="secondary">{b.category}</Badge>
                  </div>
                  <p className="text-xs text-slate-500">{b.desc}</p>
                </div>
                <button onClick={() => handleDeleteBlog(b.id)} className="p-2 text-slate-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 5: REVIEWS MANAGEMENT */}
      {activeTab === "reviews" && (
        <Card className="p-6 border border-slate-200 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-heading text-xl font-extrabold text-primary">Customer Reviews & Feedback</h2>
              <p className="text-xs text-slate-500">Manage client testimonials shown across the site.</p>
            </div>
            <Button variant="primary" size="sm" onClick={() => setShowAddReview(!showAddReview)}>
              <Plus className="w-4 h-4 mr-1" /> Add Review
            </Button>
          </div>

          {showAddReview && (
            <form onSubmit={handleCreateReview} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Client Name"
                  required
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="px-3 py-2 border rounded text-xs"
                />
                <input
                  type="text"
                  placeholder="Car Model (e.g. Mahindra Thar)"
                  value={newReview.car_model}
                  onChange={(e) => setNewReview({ ...newReview, car_model: e.target.value })}
                  className="px-3 py-2 border rounded text-xs"
                />
              </div>
              <textarea
                placeholder="Review comment..."
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="w-full px-3 py-2 border rounded text-xs"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowAddReview(false)}>Cancel</Button>
                <Button variant="primary" size="sm" type="submit">Save Review</Button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((r) => (
              <div key={r.id} className="p-4 border rounded-xl bg-white space-y-2 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-primary text-sm">{r.name}</div>
                    <div className="text-xs text-slate-500">{r.car_model}</div>
                  </div>
                  <div className="flex items-center text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 mr-1" />
                    <span>{r.rating} / 5</span>
                  </div>
                </div>
                <p className="text-xs text-slate-700 italic">"{r.comment}"</p>
                <div className="flex justify-end pt-1">
                  <button onClick={() => handleDeleteReview(r.id)} className="p-1 text-slate-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 6: CONTACT MESSAGES */}
      {activeTab === "contact" && (
        <Card className="p-6 border border-slate-200 space-y-6">
          <div>
            <h2 className="font-heading text-xl font-extrabold text-primary">Client Inquiries & Contact Forms</h2>
            <p className="text-xs text-slate-500">Every message transmitted via the contact page is logged here & dispatched to <span className="font-bold text-secondary">rikinp0102@gmail.com</span>.</p>
          </div>

          <div className="space-y-3">
            {contacts.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">No client messages received yet.</div>
            ) : (
              contacts.map((c) => (
                <div key={c.id} className="p-4 border rounded-xl bg-white space-y-2 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-primary text-sm">{c.name}</span>
                      <span className="text-xs text-slate-500 ml-2">({c.email} • {c.phone || "No phone"})</span>
                      <div className="text-xs font-bold text-secondary mt-0.5">Subject: {c.subject}</div>
                    </div>
                    <button onClick={() => handleDeleteContact(c.id)} className="p-1.5 text-slate-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-800 leading-relaxed font-mono whitespace-pre-wrap">
                    {c.message}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      )}

      {/* TAB 7: ADMIN USERS MANAGEMENT */}
      {activeTab === "users" && (
        <Card className="p-4 sm:p-6 border border-slate-200 space-y-6 rounded-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="font-heading text-lg sm:text-xl font-extrabold text-primary">Admin Dashboard Users</h2>
              <p className="text-xs text-slate-500 mt-0.5">Owners can register new admin users with email, password & 2-step OTP security verification.</p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowAddUser(!showAddUser)}
              className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-on-secondary py-2 px-4 rounded-xl text-xs font-bold shadow-md"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add New Admin User</span>
            </Button>
          </div>

          {/* ADD NEW ADMIN USER FORM */}
          {showAddUser && (
            <form onSubmit={handleCreateAdminUser} className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 shadow-inner">
              <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-wider">
                <UserPlus className="w-4 h-4" />
                <span>Register New Admin Account</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">Username *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. javed_mgr"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:border-secondary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">Email Address (For OTP) *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. manager@kbgarage.com"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:border-secondary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:border-secondary focus:outline-none"
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-500 italic">
                * Note: When the new user logs into the Admin Dashboard, a 6-digit Security OTP code will automatically be dispatched to their email address.
              </p>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowAddUser(false)} className="rounded-xl text-xs">
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" className="bg-secondary text-white rounded-xl text-xs font-bold">
                  Create Admin User
                </Button>
              </div>
            </form>
          )}

          {/* ADMIN USERS LIST / CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {adminUsers.length === 0 ? (
              <div className="col-span-full p-8 text-center text-slate-500 text-xs bg-slate-50 rounded-xl border border-dashed border-slate-200">
                No extra admin users registered yet. Click "Add New Admin User" above to create one.
              </div>
            ) : (
              adminUsers.map((u) => (
                <div key={u.id} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{u.username}</span>
                        {u.username === "admin" && (
                          <Badge variant="secondary" className="text-[10px]">Owner / Root</Badge>
                        )}
                      </div>
                      <div className="text-xs text-slate-600 font-medium">{u.email}</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-secondary shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                    <span>Joined: {new Date(u.date_joined).toLocaleDateString()}</span>
                    {u.username !== "admin" && (
                      <button
                        onClick={() => handleDeleteAdminUser(u.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1 font-semibold"
                        title="Remove Admin User"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
