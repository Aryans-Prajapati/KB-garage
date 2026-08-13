"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Lock, User, ShieldCheck, ArrowRight, Mail, KeyRound, CheckCircle2, ShieldAlert, Clock, RotateCcw, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { adminLogin, verifyLoginOtpApi, requestForgotPassword, resetAdminPasswordWithOtp, resendOtpApi } from "@/lib/api";

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mode, setMode] = useState<"login" | "login_otp" | "forgot" | "reset_otp">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [targetEmail, setTargetEmail] = useState("Kbgarage46@gmail.com");
  const [loginOtpCode, setLoginOtpCode] = useState("");

  const [forgotEmail, setForgotEmail] = useState("");
  const [resetOtpCode, setResetOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otpTimer, setOtpTimer] = useState<number>(300); // 5-minute OTP validity timer
  const [cooldownTimer, setCooldownTimer] = useState<number>(60); // 60-second resend cooldown
  const [resendLoading, setResendLoading] = useState<boolean>(false);

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("kb_admin_token");
    if (token) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  // Handle countdown timers for 5-minute expiration & 60-second resend cooldown
  useEffect(() => {
    if (mode !== "login_otp" && mode !== "reset_otp") return;

    const interval = setInterval(() => {
      setOtpTimer((prev) => (prev > 0 ? prev - 1 : 0));
      setCooldownTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [mode]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Step 1: Submit Credentials -> Trigger 6-digit OTP to Email
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);
    try {
      const data = await adminLogin(username, password);
      if (data.require_otp) {
        const emailToUse = data.email || "Kbgarage46@gmail.com";
        setTargetEmail(emailToUse);
        setSuccessMsg(data.detail || `Credentials verified! A 6-digit OTP code has been sent to ${emailToUse}.`);
        setOtpTimer(300);
        setCooldownTimer(60);
        setMode("login_otp");
      } else if (data.access_token) {
        localStorage.setItem("kb_admin_token", data.access_token);
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify Login 6-Digit OTP Code
  const handleVerifyLoginOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    if (otpTimer <= 0) {
      setError("OTP has expired. Please click 'Resend OTP' to request a new code.");
      setLoading(false);
      return;
    }

    try {
      const data = await verifyLoginOtpApi(targetEmail, loginOtpCode);
      if (data.access_token) {
        localStorage.setItem("kb_admin_token", data.access_token);
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Invalid OTP code. Please check your email and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Request Forgot Password -> Send OTP
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);
    try {
      const res = await requestForgotPassword(forgotEmail);
      setTargetEmail(forgotEmail);
      setSuccessMsg(res.detail || `If an account associated with ${forgotEmail} exists, a verification OTP has been sent.`);
      setOtpTimer(300);
      setCooldownTimer(60);
      setMode("reset_otp");
    } catch (err: any) {
      setError(err.message || "Failed to send reset OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 4: Verify Reset OTP & Update Password
  const handleResetPasswordWithOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (otpTimer <= 0) {
      setError("Reset OTP has expired. Please request a new code.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (!/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      setError("Password must contain at least one uppercase letter, one lowercase letter, and one number.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New Password and Confirm Password do not match!");
      return;
    }

    setLoading(true);
    try {
      const res = await resetAdminPasswordWithOtp(targetEmail, resetOtpCode, newPassword, confirmPassword);
      setSuccessMsg(res.detail || "Password reset successfully. Please login with your new password.");
      setTimeout(() => {
        setMode("login");
        setPassword("");
        setLoginOtpCode("");
        setResetOtpCode("");
        setNewPassword("");
        setConfirmPassword("");
      }, 2500);
    } catch (err: any) {
      setError(err.message || "Failed to reset password. Please check your OTP code.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP handler for both Login & Forgot Password flows
  const handleResendOtp = async (purpose: "login" | "reset") => {
    if (cooldownTimer > 0 || resendLoading) return;
    setError("");
    setSuccessMsg("");
    setResendLoading(true);
    try {
      const res = await resendOtpApi(targetEmail, purpose);
      setSuccessMsg(res.detail || "A new 6-digit verification OTP code has been sent to your email.");
      setOtpTimer(300);
      setCooldownTimer(60);
    } catch (err: any) {
      setError(err.message || "Failed to resend OTP code.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6">
      <Card className="w-full max-w-md p-5 sm:p-8 shadow-2xl border border-slate-200 rounded-2xl">
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
            {mode === "login" && "Owner Login Step 1/2"}
            {mode === "login_otp" && "2-Step OTP Security Step 2/2"}
            {mode === "forgot" && "Reset Password Step 1/2"}
            {mode === "reset_otp" && "Reset Password OTP Step 2/2"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-semibold rounded flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 text-xs font-semibold rounded flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* STEP 1: CREDENTIALS LOGIN FORM */}
        {mode === "login" && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Username or Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="Username or Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border-2 border-slate-300 focus:border-secondary focus:outline-none rounded-lg text-sm text-slate-900 font-medium placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setSuccessMsg("");
                    setMode("forgot");
                  }}
                  className="text-xs text-secondary font-bold hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-surface-container-low border-2 border-slate-300 focus:border-secondary focus:outline-none rounded-lg text-sm text-slate-900 font-medium placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              variant="primary"
              className="w-full py-3 bg-secondary hover:bg-secondary-dark text-on-secondary font-bold uppercase tracking-wider flex items-center justify-center gap-2 mt-4"
            >
              <span>{loading ? "Authenticating..." : "Continue to OTP Verification"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        )}

        {/* STEP 2: 2-FACTOR OTP LOGIN VERIFICATION */}
        {mode === "login_otp" && (
          <form onSubmit={handleVerifyLoginOtp} className="space-y-4">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 text-center space-y-1">
              <div>A 6-digit OTP code has been sent to your email:</div>
              <div className="font-bold text-primary font-mono text-sm">{targetEmail}</div>
            </div>

            {/* OTP Expiration Countdown Timer Banner */}
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 bg-slate-100 p-2.5 rounded-lg border border-slate-200">
              <div className="flex items-center gap-1.5 text-slate-700">
                <Clock className="w-4 h-4 text-secondary" />
                <span>OTP expires in:</span>
              </div>
              <span className={`font-mono font-bold ${otpTimer < 60 ? "text-red-600 animate-pulse" : "text-slate-900"}`}>
                {formatTime(otpTimer)}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Enter 6-Digit Security OTP Code *
              </label>
              <div className="relative">
                <KeyRound className="w-5 h-5 text-secondary absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="123456"
                  value={loginOtpCode}
                  onChange={(e) => setLoginOtpCode(e.target.value.replace(/\D/g, ""))}
                  className="w-full pl-11 pr-4 py-2.5 bg-surface-container-low border-2 border-secondary focus:border-secondary focus:outline-none rounded-lg text-center font-mono font-black text-xl tracking-widest text-primary"
                />
              </div>
            </div>

            {/* Resend OTP Button with 60s Cooldown */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-500">Didn't receive the code?</span>
              <button
                type="button"
                disabled={cooldownTimer > 0 || resendLoading}
                onClick={() => handleResendOtp("login")}
                className={`font-bold flex items-center gap-1 ${
                  cooldownTimer > 0 || resendLoading
                    ? "text-slate-400 cursor-not-allowed"
                    : "text-secondary hover:underline cursor-pointer"
                }`}
              >
                <RotateCcw className={`w-3.5 h-3.5 ${resendLoading ? "animate-spin" : ""}`} />
                <span>
                  {resendLoading
                    ? "Resending..."
                    : cooldownTimer > 0
                    ? `Resend OTP (${cooldownTimer}s)`
                    : "Resend OTP"}
                </span>
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading || loginOtpCode.length < 6 || otpTimer <= 0}
              variant="primary"
              className="w-full py-3 bg-secondary hover:bg-secondary-dark text-on-secondary font-bold uppercase tracking-wider flex items-center justify-center gap-2 mt-4"
            >
              <span>{loading ? "Verifying OTP..." : "Verify OTP & Complete Login"}</span>
              <CheckCircle2 className="w-4 h-4" />
            </Button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setSuccessMsg("");
                  setMode("login");
                }}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 underline"
              >
                Back to Password Step
              </button>
            </div>
          </form>
        )}

        {/* FORGOT PASSWORD STEP 1: REQUEST OTP */}
        {mode === "forgot" && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Enter your registered username or email address below. We will send a 6-digit security OTP code to verify your account.
            </p>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Username or Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="Username or Email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border-2 border-slate-300 focus:border-secondary focus:outline-none rounded-lg text-sm text-slate-900 font-medium placeholder:text-slate-400"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              variant="primary"
              className="w-full py-3 bg-secondary hover:bg-secondary-dark text-on-secondary font-bold uppercase tracking-wider flex items-center justify-center gap-2 mt-4"
            >
              <span>{loading ? "Sending OTP..." : "Send Reset OTP Code"}</span>
              <Mail className="w-4 h-4" />
            </Button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setSuccessMsg("");
                  setMode("login");
                }}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 underline"
              >
                Back to Login
              </button>
            </div>
          </form>
        )}

        {/* FORGOT PASSWORD STEP 2: VERIFY OTP & RESET PASSWORD */}
        {mode === "reset_otp" && (
          <form onSubmit={handleResetPasswordWithOtp} className="space-y-4">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 text-center space-y-1">
              <div>Enter the 6-digit reset OTP sent to:</div>
              <div className="font-bold text-primary font-mono text-sm">{targetEmail}</div>
            </div>

            {/* OTP Expiration Countdown Banner */}
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 bg-slate-100 p-2.5 rounded-lg border border-slate-200">
              <div className="flex items-center gap-1.5 text-slate-700">
                <Clock className="w-4 h-4 text-secondary" />
                <span>OTP expires in:</span>
              </div>
              <span className={`font-mono font-bold ${otpTimer < 60 ? "text-red-600 animate-pulse" : "text-slate-900"}`}>
                {formatTime(otpTimer)}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                6-Digit Reset OTP Code *
              </label>
              <div className="relative">
                <KeyRound className="w-5 h-5 text-secondary absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="123456"
                  value={resetOtpCode}
                  onChange={(e) => setResetOtpCode(e.target.value.replace(/\D/g, ""))}
                  className="w-full pl-11 pr-4 py-2.5 bg-surface-container-low border-2 border-secondary focus:border-secondary focus:outline-none rounded-lg text-center font-mono font-black text-xl tracking-widest text-primary"
                />
              </div>
            </div>

            {/* Resend Reset OTP Button */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-500">Didn't receive the code?</span>
              <button
                type="button"
                disabled={cooldownTimer > 0 || resendLoading}
                onClick={() => handleResendOtp("reset")}
                className={`font-bold flex items-center gap-1 ${
                  cooldownTimer > 0 || resendLoading
                    ? "text-slate-400 cursor-not-allowed"
                    : "text-secondary hover:underline cursor-pointer"
                }`}
              >
                <RotateCcw className={`w-3.5 h-3.5 ${resendLoading ? "animate-spin" : ""}`} />
                <span>
                  {resendLoading
                    ? "Resending..."
                    : cooldownTimer > 0
                    ? `Resend OTP (${cooldownTimer}s)`
                    : "Resend OTP"}
                </span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                New Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="Enter new password (min 8 chars, 1 upper, 1 lower, 1 num)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border-2 border-slate-300 focus:border-secondary focus:outline-none rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Confirm New Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border-2 border-slate-300 focus:border-secondary focus:outline-none rounded-lg text-sm"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || resetOtpCode.length < 6 || otpTimer <= 0}
              variant="primary"
              className="w-full py-3 bg-secondary hover:bg-secondary-dark text-on-secondary font-bold uppercase tracking-wider flex items-center justify-center gap-2 mt-4"
            >
              <span>{loading ? "Updating Password..." : "Submit OTP & Update Password"}</span>
              <CheckCircle2 className="w-4 h-4" />
            </Button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setSuccessMsg("");
                  setMode("login");
                }}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 underline"
              >
                Back to Login
              </button>
            </div>
          </form>
        )}

      </Card>
    </div>
  );
}

function AdminLoginFallback() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6">
      <Card className="w-full max-w-md p-5 sm:p-8 shadow-2xl border border-slate-200 rounded-2xl flex flex-col items-center justify-center min-h-[300px]">
        <div className="relative w-16 h-16 mx-auto mb-4 animate-pulse">
          <Image
            src="/logo.svg"
            alt="KB Garage Logo"
            fill
            className="object-contain drop-shadow-[0_4px_12px_rgba(212,175,55,0.4)]"
          />
        </div>
        <p className="text-sm font-medium text-slate-500">Loading Owner Portal...</p>
      </Card>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<AdminLoginFallback />}>
      <AdminLoginContent />
    </Suspense>
  );
}
