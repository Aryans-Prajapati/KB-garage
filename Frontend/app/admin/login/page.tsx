"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, User, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { adminLogin } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("kb_admin_token");
    if (token) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await adminLogin(username, password);
      if (data.access_token) {
        localStorage.setItem("kb_admin_token", data.access_token);
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-margin-mobile">
      <Card className="w-full max-w-md p-8 shadow-2xl border border-slate-200">
        <div className="text-center space-y-3 mb-6">
          <div className="relative w-16 h-16 mx-auto mb-2">
            <Image
              src="/logo.svg"
              alt="KB Garage Logo"
              fill
              className="object-contain drop-shadow-[0_4px_12px_rgba(212,175,55,0.4)]"
            />
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-primary tracking-tight">
            KB GARAGE Owner Portal
          </h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">
            Administrative Access
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-semibold rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Username or Email
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                required
                placeholder="admin or admin@kbgarage.in"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border-2 border-slate-300 focus:border-secondary focus:outline-none rounded-lg text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border-2 border-slate-300 focus:border-secondary focus:outline-none rounded-lg text-sm"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            className="w-full py-3 bg-secondary hover:bg-secondary-dark text-on-secondary font-bold uppercase tracking-wider flex items-center justify-center gap-2 mt-4"
          >
            <span>{loading ? "Authenticating..." : "Login to Admin Panel"}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-tertiary" />
          <span>Default Credentials: admin / admin123</span>
        </div>
      </Card>
    </div>
  );
}
