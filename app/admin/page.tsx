"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { login, isAuthenticated } from "@/services/auth";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // If already authenticated, redirect straight to dashboard
    if (isAuthenticated()) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Glow shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary-600/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent-600/20 blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Website
        </Link>

        <div className="glass-panel p-8 rounded-3xl border border-slate-800 bg-slate-950/70 shadow-2xl text-center space-y-6">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-primary-655 to-accent-505 flex items-center justify-center text-white font-bold text-lg mx-auto shadow-md shadow-primary-500/20">
            SB
          </div>
          
          <div className="space-y-1">
            <h1 className="text-xl font-extrabold text-white">Administrator Portal</h1>
            <p className="text-xs text-slate-400">Log in to manage blog posts, projects, and research papers.</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-950/40 border border-red-900/40 rounded-xl text-left text-xs text-red-400">
              <ShieldAlert className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-350">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@sourabh.edu"
                  className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl outline-none text-xs text-white focus:border-primary-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-350">Security Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl outline-none text-xs text-white focus:border-primary-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 text-xs shadow-md shadow-primary-500/25"
            >
              <span>{loading ? "Authenticating..." : "Sign In"}</span>
            </button>
          </form>

          <div className="border-t border-slate-800 pt-4 text-[10px] text-slate-500 space-y-1">
            <p>Mock Credentials for Testing:</p>
            <p className="font-mono text-slate-400">admin@sourabh.edu / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
