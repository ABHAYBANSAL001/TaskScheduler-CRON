// "use client";

// import dynamic from "next/dynamic";
// import { CheckCircle2, Clock, AlertCircle, BarChart3 } from "lucide-react";

// // Dynamic Imports for Performance
// const QuickPost = dynamic(() => import("./QuickPostForm"), { ssr: false });
// const ConnectionStatus = dynamic(() => import("./Connections"));
// const RecentActivity = dynamic(() => import("./RecentActivity"));

// interface DashboardViewerProps {
//   user: any;
//   postsCount: number;
//   sentCount: number;
//   upcomingPosts: any[];
//   isXConnected: boolean;
//   isLinkedinConnected: boolean;
// }

// export default function DashboardViewer({
//   user,
//   postsCount,
//   sentCount,
//   upcomingPosts,
//   isXConnected,
//   isLinkedinConnected,
// }: DashboardViewerProps) {
//   const hasConnections = isXConnected || isLinkedinConnected;

//   return (
//     <div className="max-w-6xl mx-auto pb-10 space-y-6 p-4 md:p-6 transition-all">
//       {/* 1. Welcome & Stats Header */}
//       <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-white mb-2">
//             Hello, {user.name?.split(" ")[0] || "Creator"} 👋
//           </h1>
//           <p className="text-zinc-400 text-sm">
//             Here is what's happening with your content today.
//           </p>
//         </div>

//         {/* Mini Stats Pills */}
//         <div className="flex gap-1">
//           <StatPill
//             icon={Clock}
//             label="Scheduled"
//             value={postsCount}
//             color="text-blue-400"
//           />
//           {/* You can query these real numbers later */}
//           <StatPill
//             icon={CheckCircle2}
//             label="Sent"
//             value="12"
//             color="text-emerald-400"
//           />
//         </div>
//       </div>

//       {/* 2. Main Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
//         {/* --- LEFT: Content Engine (8 Cols) --- */}
//         <div className="lg:col-span-8 space-y-8">
//           {/* COMPOSER */}
//           <QuickPost
//             isXConnected={isXConnected}
//             isLinkedinConnected={isLinkedinConnected}
//             userImage={user?.image}
//           />

//           {/* QUEUE / TIMELINE */}
//           <section>
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
//                 <Clock className="w-4 h-4" />
//                 Upcoming Queue
//               </h2>
//             </div>

//             {upcomingPosts.length > 0 ? (
//               <RecentActivity posts={upcomingPosts} />
//             ) : (
//               <EmptyQueueState hasConnections={hasConnections} />
//             )}
//           </section>
//         </div>

//         {/* --- RIGHT: Sidebar (4 Cols) --- */}
//         <div className="lg:col-span-4 space-y-6">
//           <ConnectionStatus isX={isXConnected} isLi={isLinkedinConnected} />

//           {/* Marketing / Help Card */}
//           <div className="bg-gradient-to-br from-indigo-900/20 to-blue-900/20 border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden">
//             <div className="relative z-10">
//               <h4 className="text-indigo-300 font-semibold mb-2 flex items-center gap-2">
//                 <BarChart3 className="w-4 h-4" />
//                 Analytics Coming Soon
//               </h4>
//               <p className="text-xs text-indigo-200/70 leading-relaxed">
//                 We are building advanced analytics to help you track engagement
//                 across X and LinkedIn.
//               </p>
//             </div>
//             <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-500/20 blur-2xl rounded-full" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // -- Micro Components --

// function StatPill({ icon: Icon, label, value, color }: any) {
//   return (
//     <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/5 rounded-full">
//       <Icon className={`w-4 h-4 ${color}`} />
//       <span className="text-white font-bold text-sm">{value}</span>
//       <span className="text-zinc-500 text-xs hidden sm:inline">{label}</span>
//     </div>
//   );
// }

// function EmptyQueueState({ hasConnections }: { hasConnections: boolean }) {
//   return (
//     <div className="bg-zinc-900/30 border border-white/5 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center">
//       <div className="w-16 h-16 bg-zinc-900/80 rounded-full flex items-center justify-center mb-4 shadow-xl">
//         {hasConnections ? (
//           <Clock className="w-8 h-8 text-zinc-600" />
//         ) : (
//           <AlertCircle className="w-8 h-8 text-amber-500" />
//         )}
//       </div>

//       <h3 className="text-white font-medium mb-2">
//         {hasConnections ? "Your queue is empty" : "Connect an account first"}
//       </h3>

//       <p className="text-zinc-500 text-sm max-w-xs mx-auto mb-6">
//         {hasConnections
//           ? "Great content starts with a single post. Use the composer above to schedule your first update."
//           : "You need to connect X or LinkedIn before you can schedule posts."}
//       </p>

//       {!hasConnections && (
//         <a
//           href="/dashboard/connections"
//           className="text-xs bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-zinc-200 transition"
//         >
//           Connect Accounts
//         </a>
//       )}
//     </div>
//   );
// }

"use client";

import dynamic from "next/dynamic";
import { CheckCircle2, Clock, BarChart3, Layout } from "lucide-react";

const QuickPost = dynamic(() => import("./QuickPostForm"), { ssr: false });
const ConnectionStatus = dynamic(() => import("./Connections"));
const RecentActivity = dynamic(() => import("./RecentActivity"));

export default function DashboardViewer({
  user,
  postsCount,
  sentCount,
  upcomingPosts,
  isXConnected,
  isLinkedinConnected,
}: any) {
  const hasConnections = isXConnected || isLinkedinConnected;

  return (
    <div className="max-w-6xl mx-auto  p-4 md:p-1  transition-all">
      {/* 1. HEADER AREA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-zinc-500 text-xs mt-1">
            Welcome back,{" "}
            <span className="text-zinc-300 font-medium">
              {user.name?.split(" ")[0]}
            </span>
            . System status is normal.
          </p>
        </div>

        <div className="flex gap-2">
          <StatPill
            icon={Clock}
            label="Queue"
            value={postsCount}
            color="text-blue-400"
          />
          <StatPill
            icon={CheckCircle2}
            label="Sent"
            value={sentCount}
            color="text-emerald-400"
          />
        </div>
      </div>

      {/* 2. GRID SYSTEM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: Engine */}
        <div className="lg:col-span-8 space-y-6">
          <QuickPost
            isXConnected={isXConnected}
            isLinkedinConnected={isLinkedinConnected}
            userImage={user?.image}
          />

          <section className="bg-zinc-900/20 border border-white/5 rounded-3xl p-1">
            <div className="flex items-center justify-between p-4 pb-2">
              <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                <Layout className="w-3 h-3" />
                Next in Pipeline
              </h2>
            </div>
            <RecentActivity posts={upcomingPosts} />
          </section>
        </div>

        {/* RIGHT: Sidebar */}
        <div className="lg:col-span-4 space-y-4 sticky top-6">
          <ConnectionStatus isX={isXConnected} isLi={isLinkedinConnected} />

          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-5 relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="text-[11px] font-bold text-blue-400 mb-2 flex items-center gap-2 uppercase tracking-wider">
                <BarChart3 className="w-3.5 h-3.5" />
                Insights Engine
              </h4>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Advanced engagement tracking for X & LinkedIn is being
                calibrated. Check back soon.
              </p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full group-hover:bg-blue-500/10 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatPill({ icon: Icon, label, value, color }: any) {
  return (
    <div className="flex items-center gap-2.5 px-3 py-1.5 bg-zinc-900/50 border border-white/5 rounded-xl">
      <div className={`p-1 rounded-md bg-zinc-950 ${color}`}>
        <Icon className="w-3.5 h-3.5" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-xs font-bold text-white tabular-nums">
          {value}
        </span>
        <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-tighter">
          {label}
        </span>
      </div>
    </div>
  );
}
