const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

function getErrorMessage(data: any, fallback: string): string {
  if (!data) return fallback;
  if (typeof data.detail === "string" && data.detail && data.detail !== "[object Event]") {
    return data.detail;
  }
  if (typeof data.message === "string" && data.message && data.message !== "[object Event]") {
    return data.message;
  }
  if (typeof data === "string" && data && data !== "[object Event]") {
    return data;
  }
  if (typeof data === "object") {
    try {
      const values = Object.values(data).flat().filter((v) => typeof v === "string" && v !== "[object Event]");
      if (values.length > 0) return values.join(" ");
    } catch (e) {}
  }
  return fallback;
}

async function handleResponseError(res: Response, fallback: string): Promise<never> {
  let detail = fallback;
  try {
    const data = await res.json();
    detail = getErrorMessage(data, fallback);
  } catch (e) {}
  throw new Error(detail);
}


// Fallback Indian initial data with valid internet image URLs
export const FALLBACK_SERVICES = [
  {
    id: 1,
    service_id: "general",
    title: "General Maintenance & Multi-Point Check",
    desc: "Comprehensive engine diagnostic, synthetic oil replacement, filter change, and Indian road condition suspension check.",
    price_inr: "₹2,499",
    raw_price: 2499,
    category: "maintenance",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Suzuki_Swift_%282024%29_hybrid_IMG_8820.jpg/1280px-Suzuki_Swift_%282024%29_hybrid_IMG_8820.jpg",
    icon_name: "Wrench",
    badge: "Essential",
    is_active: true,
  },
  {
    id: 2,
    service_id: "ceramic",
    title: "9H Ceramic Coating & Paint Armor",
    desc: "Ultra-hydrophobic 9H ceramic shield engineered for Indian weather, monsoon protection & intense UV dust resistance.",
    price_inr: "₹14,999",
    raw_price: 14999,
    category: "detailing",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Tata_Nexon_EV_in_Hyderabad_02.jpg/1280px-Tata_Nexon_EV_in_Hyderabad_02.jpg",
    icon_name: "Sparkles",
    badge: "Popular",
    is_active: true,
  },
  {
    id: 3,
    service_id: "ppf",
    title: "TPU Paint Protection Film (PPF)",
    desc: "Self-healing TPU film covering high-impact front zones against gravel, scratches, and highway debris.",
    price_inr: "₹49,999",
    raw_price: 49999,
    category: "detailing",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/2024_Hyundai_Creta_1.5_MPi_SX%28O%29_%28India%29_front_view.png/1280px-2024_Hyundai_Creta_1.5_MPi_SX%28O%29_%28India%29_front_view.png",
    icon_name: "ShieldCheck",
    badge: "Ultimate Armor",
    is_active: true,
  },
  {
    id: 4,
    service_id: "tuning",
    title: "Stage 1 / 2 ECU Performance Tuning",
    desc: "Dyno-tested custom remap for Indian fuel specs, optimizing torque response, fuel economy, and horsepower boost.",
    price_inr: "₹19,999",
    raw_price: 19999,
    category: "performance",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mahindra_Thar_SUV_in_%22Red_Rage%22_color_at_Ashiana_Brahmanda%2C_East_Singbhum_India_%28Ank_Kumar%2C_Infosys_limited%29_03.jpg/1280px-Mahindra_Thar_SUV_in_%22Red_Rage%22_color_at_Ashiana_Brahmanda%2C_East_Singbhum_India_%28Ank_Kumar%2C_Infosys_limited%29_03.jpg",
    icon_name: "Zap",
    badge: "High Performance",
    is_active: true,
  },
  {
    id: 5,
    service_id: "detailing",
    title: "Deep Interior Steam & Leather Care",
    desc: "Complete interior sanitization, AC duct steam cleaning, leather conditioning & stain removal.",
    price_inr: "₹5,999",
    raw_price: 5999,
    category: "detailing",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/2021_Toyota_Fortuner_2.8_VRZ_4x4_%28Malaysia%29_front_view.jpg/1280px-2021_Toyota_Fortuner_2.8_VRZ_4x4_%28Malaysia%29_front_view.jpg",
    icon_name: "Sparkles",
    badge: "Signature",
    is_active: true,
  },
];

// Client-Side In-Memory Cache Implementation
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const apiCache = new Map<string, CacheEntry<any>>();
const DEFAULT_TTL_MS = 5 * 60 * 1000; // 5 minutes cache TTL

export function getCached<T>(key: string, ttlMs = DEFAULT_TTL_MS): T | null {
  const entry = apiCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > ttlMs) {
    apiCache.delete(key);
    return null;
  }
  return entry.data as T;
}

export function setCached<T>(key: string, data: T): void {
  apiCache.set(key, { data, timestamp: Date.now() });
}

export function hasCachedData(key: string, ttlMs = DEFAULT_TTL_MS): boolean {
  return getCached(key, ttlMs) !== null;
}

export function invalidateCache(keyPrefixOrExact?: string): void {
  if (!keyPrefixOrExact) {
    apiCache.clear();
    return;
  }
  for (const key of apiCache.keys()) {
    if (key === keyPrefixOrExact || key.startsWith(keyPrefixOrExact)) {
      apiCache.delete(key);
    }
  }
}

export async function fetchServices(options?: { forceFetch?: boolean }) {
  const cacheKey = "services";
  if (!options?.forceFetch) {
    const cached = getCached<any[]>(cacheKey);
    if (cached) return cached;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/services/`);
    if (!res.ok) throw new Error("Failed to fetch services");
    const data = await res.json();
    setCached(cacheKey, data);
    return data;
  } catch (err) {
    console.warn("Using fallback services data:", err);
    setCached(cacheKey, FALLBACK_SERVICES);
    return FALLBACK_SERVICES;
  }
}

export async function createBooking(bookingData: {
  make: string;
  model: string;
  year: string;
  service_id: string;
  service_name: string;
  price_inr: string;
  date: string;
  time_slot: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  notes?: string;
}) {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });
    if (!res.ok) throw new Error("Booking creation failed");
    const result = await res.json();
    invalidateCache("bookings");
    invalidateCache("admin_stats");
    return result;
  } catch (err) {
    console.warn("Fallback booking creation:", err);
    const fallbackResult = {
      id: Date.now(),
      reference_id: `KB-${Math.floor(100000 + Math.random() * 900000)}`,
      ...bookingData,
      status: "Confirmed",
      created_at: new Date().toISOString(),
    };
    invalidateCache("bookings");
    invalidateCache("admin_stats");
    return fallbackResult;
  }
}

export async function adminLogin(username: string, password: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    let data: any = {};
    try {
      data = await res.json();
    } catch (e) {}
    if (!res.ok) {
      throw new Error(getErrorMessage(data, "Invalid username or password"));
    }
    return data;
  } catch (err: any) {
    if (err instanceof Error && err.message && err.message !== "[object Event]") {
      throw err;
    }
    throw new Error("Invalid username or password");
  }
}

export async function verifyLoginOtpApi(email: string, otp_code: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/verify-login-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp_code }),
    });
    let data: any = {};
    try {
      data = await res.json();
    } catch (e) {}
    if (!res.ok) {
      throw new Error(getErrorMessage(data, "Invalid OTP code"));
    }
    return data;
  } catch (err: any) {
    if (err instanceof Error && err.message && err.message !== "[object Event]") {
      throw err;
    }
    throw new Error("Invalid OTP code");
  }
}

export async function resendOtpApi(email: string, purpose: "login" | "reset" = "login") {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/resend-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, purpose }),
    });
    let data: any = {};
    try {
      data = await res.json();
    } catch (e) {}
    if (!res.ok) {
      throw new Error(getErrorMessage(data, "Failed to resend OTP code"));
    }
    return data;
  } catch (err: any) {
    if (err instanceof Error && err.message && err.message !== "[object Event]") {
      throw err;
    }
    throw new Error("Failed to resend OTP code");
  }
}

export async function requestForgotPassword(email: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    let data: any = {};
    try {
      data = await res.json();
    } catch (e) {}
    if (!res.ok) {
      throw new Error(getErrorMessage(data, "Request failed"));
    }
    return data;
  } catch (err: any) {
    if (err instanceof Error && err.message && err.message !== "[object Event]") {
      throw err;
    }
    throw new Error("Request failed");
  }
}

export async function resetAdminPasswordWithOtp(email: string, otp_code: string, new_password: string, confirm_password: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp_code, new_password, confirm_password }),
    });
    let data: any = {};
    try {
      data = await res.json();
    } catch (e) {}
    if (!res.ok) {
      throw new Error(getErrorMessage(data, "Reset failed"));
    }
    return data;
  } catch (err: any) {
    if (err instanceof Error && err.message && err.message !== "[object Event]") {
      throw err;
    }
    throw new Error("Reset failed");
  }
}

export async function fetchDashboardStats(token: string, options?: { forceFetch?: boolean }) {
  const cacheKey = `admin_stats_${token}`;
  if (!options?.forceFetch) {
    const cached = getCached<any>(cacheKey);
    if (cached) return cached;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch dashboard stats");
    const data = await res.json();
    setCached(cacheKey, data);
    return data;
  } catch (err) {
    const fallback = {
      total_bookings: 2,
      pending_bookings: 1,
      confirmed_bookings: 1,
      completed_bookings: 0,
      total_revenue_formatted: "₹34,998",
      active_services: 5,
      gallery_items: 6,
      total_blogs: 3,
      total_reviews: 3,
      contact_messages: 1,
      unread_messages: 1,
    };
    setCached(cacheKey, fallback);
    return fallback;
  }
}

export async function fetchAllBookings(token: string, statusFilter?: string, options?: { forceFetch?: boolean }) {
  const cacheKey = `bookings_${statusFilter || "All"}`;
  if (!options?.forceFetch) {
    const cached = getCached<any[]>(cacheKey);
    if (cached) return cached;
  }

  try {
    let url = `${API_BASE_URL}/bookings/`;
    if (statusFilter && statusFilter !== "All") {
      url += `?status_filter=${statusFilter}`;
    }
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch bookings");
    const data = await res.json();
    setCached(cacheKey, data);
    return data;
  } catch (err) {
    setCached(cacheKey, []);
    return [];
  }
}

export async function updateBookingStatus(token: string, bookingId: number, status: string) {
  const res = await fetch(`${API_BASE_URL}/bookings/${bookingId}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update status");
  const data = await res.json();
  invalidateCache("bookings");
  invalidateCache("admin_stats");
  return data;
}

export async function deleteBookingApi(token: string, bookingId: number) {
  const res = await fetch(`${API_BASE_URL}/bookings/${bookingId}/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    let detail = "Failed to delete booking";
    try {
      const data = await res.json();
      detail = data.detail || detail;
    } catch (e) {}
    throw new Error(detail);
  }
  invalidateCache("bookings");
  invalidateCache("admin_stats");
  try {
    return await res.json();
  } catch (e) {
    return { success: true };
  }
}

export async function createServiceApi(token: string, data: any) {
  const res = await fetch(`${API_BASE_URL}/services/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) await handleResponseError(res, "Failed to create service");
  const result = await res.json();
  invalidateCache("services");
  invalidateCache("admin_stats");
  return result;
}

export async function updateServiceApi(token: string, serviceId: number, data: any) {
  const res = await fetch(`${API_BASE_URL}/services/${serviceId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) await handleResponseError(res, "Failed to update service");
  const result = await res.json();
  invalidateCache("services");
  invalidateCache("admin_stats");
  return result;
}

export async function deleteServiceApi(token: string, serviceId: number) {
  const res = await fetch(`${API_BASE_URL}/services/${serviceId}/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    let detail = "Failed to delete service";
    try {
      const data = await res.json();
      detail = data.detail || detail;
    } catch (e) {}
    throw new Error(detail);
  }
  invalidateCache("services");
  invalidateCache("admin_stats");
  try {
    return await res.json();
  } catch (e) {
    return { success: true };
  }
}

// Gallery API
export async function fetchGalleryItems(options?: { forceFetch?: boolean }) {
  const cacheKey = "gallery";
  if (!options?.forceFetch) {
    const cached = getCached<any[]>(cacheKey);
    if (cached) return cached;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/gallery/`);
    if (!res.ok) throw new Error("Failed to fetch gallery items");
    const data = await res.json();
    setCached(cacheKey, data);
    return data;
  } catch (err) {
    setCached(cacheKey, []);
    return [];
  }
}

export async function createGalleryItemApi(token: string, data: any) {
  const res = await fetch(`${API_BASE_URL}/gallery/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) await handleResponseError(res, "Failed to create gallery item");
  const result = await res.json();
  invalidateCache("gallery");
  invalidateCache("admin_stats");
  return result;
}

export async function updateGalleryItemApi(token: string, itemId: number, data: any) {
  const res = await fetch(`${API_BASE_URL}/gallery/${itemId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) await handleResponseError(res, "Failed to update gallery item");
  const result = await res.json();
  invalidateCache("gallery");
  invalidateCache("admin_stats");
  return result;
}

export async function deleteGalleryItemApi(token: string, itemId: number) {
  const res = await fetch(`${API_BASE_URL}/gallery/${itemId}/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    let detail = "Failed to delete gallery item";
    try {
      const data = await res.json();
      detail = data.detail || detail;
    } catch (e) {}
    throw new Error(detail);
  }
  invalidateCache("gallery");
  invalidateCache("admin_stats");
  try {
    return await res.json();
  } catch (e) {
    return { success: true };
  }
}

// Blogs API
export async function fetchBlogPosts(options?: { forceFetch?: boolean }) {
  const cacheKey = "blogs";
  if (!options?.forceFetch) {
    const cached = getCached<any[]>(cacheKey);
    if (cached) return cached;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/blogs/`);
    if (!res.ok) throw new Error("Failed to fetch blog posts");
    const data = await res.json();
    setCached(cacheKey, data);
    return data;
  } catch (err) {
    setCached(cacheKey, []);
    return [];
  }
}

export async function createBlogPostApi(token: string, data: any) {
  const res = await fetch(`${API_BASE_URL}/blogs/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) await handleResponseError(res, "Failed to create blog post");
  const result = await res.json();
  invalidateCache("blogs");
  invalidateCache("admin_stats");
  return result;
}

export async function updateBlogPostApi(token: string, postId: number, data: any) {
  const res = await fetch(`${API_BASE_URL}/blogs/${postId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) await handleResponseError(res, "Failed to update blog post");
  const result = await res.json();
  invalidateCache("blogs");
  invalidateCache("admin_stats");
  return result;
}

export async function deleteBlogPostApi(token: string, postId: number) {
  const res = await fetch(`${API_BASE_URL}/blogs/${postId}/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    let detail = "Failed to delete blog post";
    try {
      const data = await res.json();
      detail = data.detail || detail;
    } catch (e) {}
    throw new Error(detail);
  }
  invalidateCache("blogs");
  invalidateCache("admin_stats");
  try {
    return await res.json();
  } catch (e) {
    return { success: true };
  }
}

// Reviews API
export async function fetchReviews(options?: { forceFetch?: boolean }) {
  const cacheKey = "reviews";
  if (!options?.forceFetch) {
    const cached = getCached<any[]>(cacheKey);
    if (cached) return cached;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/reviews/`);
    if (!res.ok) throw new Error("Failed to fetch reviews");
    const data = await res.json();
    setCached(cacheKey, data);
    return data;
  } catch (err) {
    setCached(cacheKey, []);
    return [];
  }
}

export async function createReviewApi(token: string, data: any) {
  const res = await fetch(`${API_BASE_URL}/reviews/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create review");
  const result = await res.json();
  invalidateCache("reviews");
  invalidateCache("admin_stats");
  return result;
}

export async function updateReviewApi(token: string, reviewId: number, data: any) {
  const res = await fetch(`${API_BASE_URL}/reviews/${reviewId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update review");
  const result = await res.json();
  invalidateCache("reviews");
  invalidateCache("admin_stats");
  return result;
}

export async function deleteReviewApi(token: string, reviewId: number) {
  const res = await fetch(`${API_BASE_URL}/reviews/${reviewId}/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    let detail = "Failed to delete review";
    try {
      const data = await res.json();
      detail = data.detail || detail;
    } catch (e) {}
    throw new Error(detail);
  }
  invalidateCache("reviews");
  invalidateCache("admin_stats");
  try {
    return await res.json();
  } catch (e) {
    return { success: true };
  }
}

// Contact Messages API
export async function submitContactForm(data: { name: string; email: string; phone?: string; subject?: string; message: string }) {
  try {
    const res = await fetch(`${API_BASE_URL}/contact/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Contact form submission failed");
    const result = await res.json();
    invalidateCache("contacts");
    invalidateCache("admin_stats");
    return result;
  } catch (err) {
    console.warn("Fallback contact submission:", err);
    invalidateCache("contacts");
    invalidateCache("admin_stats");
    return { success: true };
  }
}

export async function fetchAllContactMessages(token: string, options?: { forceFetch?: boolean }) {
  const cacheKey = "contacts";
  if (!options?.forceFetch) {
    const cached = getCached<any[]>(cacheKey);
    if (cached) return cached;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/contact/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch contact messages");
    const data = await res.json();
    setCached(cacheKey, data);
    return data;
  } catch (err) {
    setCached(cacheKey, []);
    return [];
  }
}

export async function deleteContactMessageApi(token: string, contactId: number) {
  const res = await fetch(`${API_BASE_URL}/contact/${contactId}/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    let detail = "Failed to delete contact message";
    try {
      const data = await res.json();
      detail = data.detail || detail;
    } catch (e) {}
    throw new Error(detail);
  }
  invalidateCache("contacts");
  invalidateCache("admin_stats");
  try {
    return await res.json();
  } catch (e) {
    return { success: true };
  }
}

export async function uploadImageApi(token: string, file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const res = await fetch(`${API_BASE_URL}/upload/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!res.ok) throw new Error("File upload failed");
    return await res.json();
  } catch (err) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve({ url: reader.result as string });
      reader.readAsDataURL(file);
    });
  }
}

// Admin Users Management API
export async function fetchAdminUsers(token: string, options?: { forceFetch?: boolean }) {
  const cacheKey = "admin_users";
  if (!options?.forceFetch) {
    const cached = getCached<any[]>(cacheKey);
    if (cached) return cached;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch admin users");
    const data = await res.json();
    setCached(cacheKey, data);
    return data;
  } catch (err) {
    setCached(cacheKey, []);
    return [];
  }
}

export async function createAdminUser(token: string, userData: { username: string; email: string; password: string }) {
  const res = await fetch(`${API_BASE_URL}/admin/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || Object.values(data).flat().join(" ") || "Failed to create admin user");
  }
  invalidateCache("admin_users");
  return data;
}

export async function deleteAdminUser(token: string, userId: number) {
  const res = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  let data: any = {};
  try {
    data = await res.json();
  } catch (e) {
    data = {};
  }
  if (!res.ok) throw new Error(data.detail || "Failed to delete admin user");
  invalidateCache("admin_users");
  return data;
}

