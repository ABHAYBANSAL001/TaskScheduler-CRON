"use client";

import { useState } from "react";
import {
  updateProfile,
  disconnectPlatform,
  deleteAccount,
} from "@/app/actions/settings-actions";
import {
  User,
  Mail,
  Globe,
  Save,
  Loader2,
  Twitter,
  Linkedin,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Zap,
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* --- LEFT COLUMN: PROFILE & PREFERENCES (8 Units) --- */}
      <div className="lg:col-span-7 space-y-6">
        <section className="bg-zinc-900/40 border border-white/5 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
            <h2 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-blue-500" /> Account Profile
            </h2>
          </div>

          <form action={handleUpdate} className="p-5 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-500 uppercase">
                  Display Name
                </label>
                <input
                  name="name"
                  defaultValue={user.name || ""}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-500 uppercase">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    value={user.email || ""}
                    readOnly
                    className="w-full bg-zinc-950 border border-white/5 rounded-lg px-3 py-2 text-sm text-zinc-500 cursor-not-allowed pl-9"
                  />
                  <Mail className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-700" />
                </div>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase">
                  Timezone
                </label>
                <div className="relative">
                  <select
                    name="timezone"
                    defaultValue={user.timezone || "UTC"}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                  >
                    <option value="UTC">UTC (Universal Time)</option>
                    <option value="Asia/Calcutta">Asia/Calcutta (IST)</option>
                    <option value="America/New_York">
                      America/New_York (EST)
                    </option>
                  </select>
                  <Globe className="absolute right-3 top-2.5 w-3.5 h-3.5 text-zinc-600 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                disabled={isPending}
                className="bg-white text-black px-4 py-1.5 rounded-lg text-[11px] font-bold hover:bg-zinc-200 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isPending ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Save className="w-3 h-3" />
                )}
                Save
              </button>
            </div>
          </form>
        </section>

        {/* --- PREFERENCES --- */}
        <section className="bg-zinc-900/40 border border-white/5 rounded-xl p-5">
          <h2 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">
            Scheduling Behavior
          </h2>
          <label className="flex items-center gap-3 cursor-not-allowed opacity-50">
            <div className="w-8 h-4 bg-zinc-800 rounded-full relative">
              <div className="absolute left-1 top-1 w-2 h-2 bg-zinc-600 rounded-full" />
            </div>
            <span className="text-xs text-zinc-500">
              Auto-skip weekends (Coming Soon)
            </span>
          </label>
        </section>
      </div>

      {/* --- RIGHT COLUMN: INTEGRATIONS & DANGER (4 Units) --- */}
      <div className="lg:col-span-5 space-y-6">
        {/* INTEGRATIONS */}
        <section className="bg-zinc-900/40 border border-white/5 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5 bg-white/[0.01]">
            <h2 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-yellow-500" /> Channels
            </h2>
          </div>
          <div className="p-4 space-y-2">
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
        <section className="bg-zinc-900/40 border border-white/5 rounded-xl p-4">
          <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">
            Auth Provider
          </h3>
          <div className="flex items-center justify-between p-3 bg-black/40 border border-white/5 rounded-lg">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs text-zinc-300 font-medium">
                Google SSO
              </span>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-[10px] font-bold text-zinc-600 hover:text-white uppercase"
            >
              Logout
            </button>
          </div>
        </section>

        {/* DANGER ZONE */}
        <section className="border border-red-500/10 bg-red-500/[0.02] rounded-xl p-4">
          <h3 className="text-[10px] font-bold text-red-500/80 uppercase tracking-widest mb-2 flex items-center gap-2">
            <AlertTriangle className="w-3 h-3" /> Danger Zone
          </h3>
          <button
            onClick={() => confirm("Delete account?") && deleteAccount()}
            className="w-full py-2 text-red-500/50 hover:text-red-500 hover:bg-red-500/5 text-[10px] font-bold transition-all border border-red-500/10 rounded-lg uppercase"
          >
            Remove Account
          </button>
        </section>
      </div>
    </div>
  );
}

function PlatformRow({ label, icon, connectedUser }: any) {
  return (
    <Link href="connections" title="Manage Connections">
      <div className="flex items-center justify-between p-3 bg-black/20 border border-white/5 rounded-lg">
        <div className="flex items-center gap-3">
          <div
            className={`p-1.5 rounded-md ${connectedUser ? "bg-white text-black" : "bg-zinc-800 text-zinc-600"}`}
          >
            {icon}
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-200">{label}</p>
            {connectedUser && (
              <p className="text-[9px] text-emerald-500 font-medium">Active</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
