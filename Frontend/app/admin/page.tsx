"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLoginPage from "./login/page";

export default function AdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("kb_admin_token");
    if (token) {
      router.push("/admin/dashboard");
    } else {
      router.push("/admin/login");
    }
  }, [router]);

  return <AdminLoginPage />;
}
