"use client";

import { useState } from "react";
import { updateProfile } from "@/app/actions/settings-actions";
import {
  User,
  Mail,
  Globe,
  Save,
  Loader2,
  Twitter,
  Linkedin,
  AlertTriangle,
  ShieldCheck,
  Zap,
  Crown,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function SettingsForm({ user }: { user: any }) {
  const [isPending, setIsPending] = useState(false);

  const handleUpdate = async (formData: FormData) => {
    setIsPending(true);
    await updateProfile(formData);
    setIsPending(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start ">
      {/* --- LEFT COLUMN: PROFILE & SUBSCRIPTION (7 Units) --- */}
      <div className="lg:col-span-7 md:space-y-3 space-y-7">
        {/* 1. PROFILE SETTINGS */}
        <section className="bg-zinc-900/40 border border-white/5 rounded-xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
            <h2 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-blue-500" /> Account Profile
            </h2>
          </div>

          <form action={handleUpdate} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-zinc-500 uppercase">
                  Display Name
                </label>
                <input
                  name="name"
                  defaultValue={user.name || ""}
                  className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-zinc-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-zinc-500 uppercase">
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    value={user.email || ""}
                    readOnly
                    className="w-full bg-zinc-950/50 border border-white/5 rounded-lg px-4 py-2.5 text-sm text-zinc-500 cursor-not-allowed pl-10"
                  />
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-zinc-700" />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-[11px] font-bold text-zinc-500 uppercase">
                  Timezone
                </label>
                <div className="relative">
                  <select
                    name="timezone"
                    defaultValue={user.timezone || "UTC"}
                    className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none cursor-pointer"
                  >
                    <option value="UTC">UTC (Universal Time)</option>
                    <option value="Asia/Calcutta">Asia/Calcutta (IST)</option>
                    <option value="America/New_York">
                      America/New_York (EST)
                    </option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                  </select>
                  <Globe className="absolute right-4 top-3 w-4 h-4 text-zinc-600 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end border-t border-white/5 mt-4">
              <button
                disabled={isPending}
                className="bg-white text-black px-5 py-2 rounded-lg text-xs font-bold hover:bg-zinc-200 transition-all flex items-center gap-2 disabled:opacity-50 mt-4"
              >
                {isPending ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                Save Changes
              </button>
            </div>
          </form>
        </section>

        {/* 2. PLAN & UPGRADE (New Section) */}
        <section className="bg-zinc-900/40 border border-white/5 rounded-xl p-6 relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-[60px] -mr-10 -mt-10 pointer-events-none"></div>

          <h2 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10">
            <Crown className="w-3.5 h-3.5 text-orange-500" /> Subscription Plan
          </h2>

          <div className="bg-zinc-950/50 border border-white/5 rounded-xl p-5 mb-5 relative z-10">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-sm font-bold text-white">Starter Plan</h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Limited to 10 lifetime posts.
                </p>
              </div>
              <span className="text-[10px] font-bold bg-zinc-800 text-zinc-400 px-2 py-1 rounded border border-white/5">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Unlock unlimited scheduling, advanced analytics, and priority
              support by upgrading to the Pro plan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 relative z-10">
            <a
              href="mailto:theabhaybansal@gmail.com?subject=Upgrade%20Schedulr%20Plan&body=Hi%20Abhay,%20I%20would%20like%20to%20upgrade%20my%20account%20to%20Pro."
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white text-black text-xs font-bold rounded-lg hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Contact to Upgrade
            </a>
            <a
              href="https://abhaybansal.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-zinc-800 text-zinc-300 text-xs font-bold rounded-lg hover:bg-zinc-700 hover:text-white border border-white/5 transition-colors"
            >
              Visit Portfolio <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>
      </div>

      {/* --- RIGHT COLUMN: INTEGRATIONS & DANGER (5 Units) --- */}
      <div className="lg:col-span-5 space-y-6">
        {/* INTEGRATIONS */}
        <section className="bg-zinc-900/40 border border-white/5 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-white/5 bg-white/[0.01]">
            <h2 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-yellow-500" /> Channels
            </h2>
          </div>
          <div className="p-5 space-y-3">
            <PlatformRow
              label="X (Twitter)"
              icon={<Twitter className="w-3.5 h-3.5" />}
              connectedUser={user.platformAccounts.find(
                (p: any) => p.platform === "TWITTER",
              )}
            />
            <PlatformRow
              label="LinkedIn"
              icon={<Linkedin className="w-3.5 h-3.5" />}
              connectedUser={user.platformAccounts.find(
                (p: any) => p.platform === "LINKEDIN",
              )}
            />
          </div>
        </section>

        {/* SECURITY */}
        <section className="bg-zinc-900/40 border border-white/5 rounded-xl p-5">
          <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-4">
            Auth Provider
          </h3>
          <div className="flex items-center justify-between p-3 bg-black/40 border border-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <div className="flex flex-col">
                <span className="text-sm text-zinc-200 font-medium leading-none">
                  Google SSO
                </span>
                <span className="text-[10px] text-zinc-500 mt-1">
                  Secure access
                </span>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-[10px] font-bold text-zinc-500 hover:text-white uppercase transition-colors px-2 py-1"
            >
              Logout
            </button>
          </div>
        </section>

        {/* DANGER ZONE */}
        <section className="border border-red-500/10 bg-red-500/[0.02] rounded-xl p-5">
          <h3 className="text-[11px] font-bold text-red-500/80 uppercase tracking-widest mb-3 flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5" /> Danger Zone
          </h3>
          <button
            onClick={() =>
              confirm("Please contact support to delete your account data.")
            }
            className="w-full py-2.5 text-red-500/60 hover:text-red-500 hover:bg-red-500/5 text-[11px] font-bold transition-all border border-red-500/10 hover:border-red-500/20 rounded-lg uppercase tracking-wide"
          >
            Delete Account
          </button>
        </section>
      </div>
    </div>
  );
}

function PlatformRow({ label, icon, connectedUser }: any) {
  return (
    <Link
      href="/dashboard/connections"
      title="Manage Connections"
      className="block group"
    >
      <div className="flex items-center justify-between p-3.5 bg-black/20 border border-white/5 rounded-lg group-hover:bg-black/40 group-hover:border-white/10 transition-all">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-md ${connectedUser ? "bg-white text-black" : "bg-zinc-800 text-zinc-600"}`}
          >
            {icon}
          </div>
          <div>
            <p className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">
              {label}
            </p>
            {connectedUser ? (
              <p className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>{" "}
                Active
              </p>
            ) : (
              <p className="text-[10px] text-zinc-600 group-hover:text-zinc-500">
                Not connected
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
