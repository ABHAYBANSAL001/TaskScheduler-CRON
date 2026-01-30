"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PenSquare,
  CalendarClock,
  BarChart3,
  Settings,
  LogOut,
  HelpCircle,
  Zap,
} from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Create Post", href: "/dashboard/create", icon: PenSquare },
  { label: "Schedule", href: "/dashboard/schedule", icon: CalendarClock },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex-col hidden md:flex h-screen fixed left-0 top-0 z-50">
      {/* 1. Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-zinc-800/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span className="font-bold text-white text-lg tracking-tight">
            Schedulr.
          </span>
        </div>
      </div>

      {/* 2. Main Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map((item) => {
          // Check if path matches or if it's a sub-path (except for root dashboard)
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group
                ${
                  isActive
                    ? "bg-zinc-900 text-white shadow-sm ring-1 ring-white/5"
                    : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50"
                }
              `}
            >
              <item.icon
                className={`w-4 h-4 transition-colors ${
                  isActive
                    ? "text-blue-400"
                    : "text-zinc-600 group-hover:text-zinc-400"
                }`}
              />
              {item.label}
            </Link>
          );
        })}

        {/* Support Section (Important for SaaS) */}
        <div className="pt-6 mt-6 border-t border-zinc-800/50">
          <p className="px-3 text-[10px] font-bold text-zinc-600 uppercase tracking-wider mb-2">
            Support
          </p>
          <Link
            href="/dashboard/help"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50 rounded-lg transition-all"
          >
            <HelpCircle className="w-4 h-4 text-zinc-600" />
            Help & Docs
          </Link>
        </div>
      </nav>

      {/* 3. User & Plan Footer */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-900/20">
        {/* Plan Status Badge (What you needed more) */}
        <div className="mb-4 p-3 bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-xl">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-medium text-zinc-400">
              Current Plan
            </span>
            <span className="text-[10px] font-bold text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded border border-blue-400/20">
              PRO
            </span>
          </div>
          <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
            <div className="bg-blue-500 w-[65%] h-full rounded-full" />
          </div>
          <p className="text-[10px] text-zinc-500 mt-1.5">
            15/20 posts scheduled
          </p>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          {user?.image ? (
            <img
              src={user.image}
              alt={user.name || "User"}
              className="w-9 h-9 rounded-full border border-zinc-700 object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-9 h-9 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700">
              <span className="text-xs font-bold text-zinc-400">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-200 truncate">
              {user?.name || "User"}
            </p>
            <p className="text-[11px] text-zinc-500 truncate">{user?.email}</p>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
