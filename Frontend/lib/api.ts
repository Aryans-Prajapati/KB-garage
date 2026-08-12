const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

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

export async function fetchServices() {
  try {
    const res = await fetch(`${API_BASE_URL}/services/`);
    if (!res.ok) throw new Error("Failed to fetch services");
    return await res.json();
  } catch (err) {
    console.warn("Using fallback services data:", err);
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
    return await res.json();
  } catch (err) {
    console.warn("Fallback booking creation:", err);
    return {
      id: Date.now(),
      reference_id: `KB-${Math.floor(100000 + Math.random() * 900000)}`,
      ...bookingData,
      status: "Confirmed",
      created_at: new Date().toISOString(),
    };
  }
}

export async function adminLogin(username: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || "Invalid username or password");
  }
  return data;
}

export async function verifyLoginOtpApi(email: string, otp_code: string) {
  const res = await fetch(`${API_BASE_URL}/admin/verify-login-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp_code }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || "Invalid OTP code");
  }
  return data;
}

export async function requestForgotPassword(email: string) {
  const res = await fetch(`${API_BASE_URL}/admin/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || "Request failed");
  }
  return data;
}

export async function resetAdminPasswordWithOtp(email: string, otp_code: string, new_password: string, confirm_password: string) {
  const res = await fetch(`${API_BASE_URL}/admin/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp_code, new_password, confirm_password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || "Reset failed");
  }
  return data;
}


export async function fetchDashboardStats(token: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch dashboard stats");
    return await res.json();
  } catch (err) {
    return {
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
  }
}

export async function fetchAllBookings(token: string, statusFilter?: string) {
  try {
    let url = `${API_BASE_URL}/bookings/`;
    if (statusFilter && statusFilter !== "All") {
      url += `?status_filter=${statusFilter}`;
    }
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch bookings");
    return await res.json();
  } catch (err) {
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
  return await res.json();
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
  if (!res.ok) throw new Error("Failed to create service");
  return await res.json();
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
  if (!res.ok) throw new Error("Failed to update service");
  return await res.json();
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
  try {
    return await res.json();
  } catch (e) {
    return { success: true };
  }
}

// Gallery API
export async function fetchGalleryItems() {
  try {
    const res = await fetch(`${API_BASE_URL}/gallery/`);
    if (!res.ok) throw new Error("Failed to fetch gallery items");
    return await res.json();
  } catch (err) {
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
  if (!res.ok) throw new Error("Failed to create gallery item");
  return await res.json();
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
  if (!res.ok) throw new Error("Failed to update gallery item");
  return await res.json();
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
  try {
    return await res.json();
  } catch (e) {
    return { success: true };
  }
}

// Blogs API
export async function fetchBlogPosts() {
  try {
    const res = await fetch(`${API_BASE_URL}/blogs/`);
    if (!res.ok) throw new Error("Failed to fetch blog posts");
    return await res.json();
  } catch (err) {
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
  if (!res.ok) throw new Error("Failed to create blog post");
  return await res.json();
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
  if (!res.ok) throw new Error("Failed to update blog post");
  return await res.json();
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
  try {
    return await res.json();
  } catch (e) {
    return { success: true };
  }
}

// Reviews API
export async function fetchReviews() {
  try {
    const res = await fetch(`${API_BASE_URL}/reviews/`);
    if (!res.ok) throw new Error("Failed to fetch reviews");
    return await res.json();
  } catch (err) {
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
  return await res.json();
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
  return await res.json();
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
    return await res.json();
  } catch (err) {
    console.warn("Fallback contact submission:", err);
    return { success: true };
  }
}

export async function fetchAllContactMessages(token: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/contact/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch contact messages");
    return await res.json();
  } catch (err) {
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
export async function fetchAdminUsers(token: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch admin users");
    return await res.json();
  } catch (err) {
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
  return data;
}

