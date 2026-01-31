// "use client";

// import { useState } from "react";
// import {
//   Twitter,
//   Linkedin,
//   CheckCircle2,
//   Clock,
//   XCircle,
//   AlertCircle,
//   ChevronDown,
//   ChevronRight,
//   Filter,
//   RefreshCw,
//   MoreHorizontal,
//   Search,
//   Calendar,
//   Loader2,
// } from "lucide-react";
// import { format } from "date-fns";

// interface ScheduleFeedProps {
//   initialUpcoming: any[];
//   initialHistory: any[];
//   platformName: string;
//   isConnected: boolean;
// }

// export default function ScheduleFeed({
//   initialUpcoming,
//   initialHistory,
//   platformName,
//   isConnected,
// }: ScheduleFeedProps) {
//   const [activeTab, setActiveTab] = useState<"UPCOMING" | "HISTORY">(
//     "UPCOMING",
//   );
//   // In a real app with pagination, you'd fetch these. For MVP, we switch props.
//   const items = activeTab === "UPCOMING" ? initialUpcoming : initialHistory;

//   const [expandedRow, setExpandedRow] = useState<string | null>(null);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const handleRefresh = () => {
//     setIsRefreshing(true);
//     // In a real app, call router.refresh() here
//     setTimeout(() => setIsRefreshing(false), 1000);
//   };

//   const PlatformIcon = platformName.includes("Twitter") ? Twitter : Linkedin;

//   return (
//     <div className="min-h-screen bg-black text-zinc-200 font-sans selection:bg-zinc-800">
//       {/* --- HEADER --- */}
//       <header className="mb-8 flex items-end justify-between border-b border-zinc-800/60 pb-6">
//         <div className="flex items-center gap-4">
//           <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 flex items-center justify-center shadow-inner">
//             <PlatformIcon className="w-6 h-6 text-white" />
//           </div>
//           <div>
//             <h1 className="text-xl font-semibold text-white tracking-tight">
//               {platformName} Integration
//             </h1>
//             <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1 font-mono">
//               {isConnected ? (
//                 <span className="bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
//                   <CheckCircle2 className="w-3 h-3" /> CONNECTED
//                 </span>
//               ) : (
//                 <span className="bg-red-500/10 text-red-500 px-1.5 py-0.5 rounded border border-red-500/20 flex items-center gap-1">
//                   <XCircle className="w-3 h-3" /> DISCONNECTED
//                 </span>
//               )}
//               <span>•</span>
//               <span>LATENCY: 24ms</span>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <button
//             onClick={handleRefresh}
//             className="h-8 px-3 text-xs font-medium text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-md hover:text-white hover:border-zinc-700 transition-colors flex items-center gap-2"
//           >
//             <RefreshCw
//               className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
//             />
//             Sync Status
//           </button>
//         </div>
//       </header>

//       {/* --- CONTROLS --- */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
//         {/* Tabs */}
//         <div className="bg-zinc-900/50 p-1 rounded-lg border border-zinc-800/60 inline-flex w-full sm:w-auto">
//           <TabButton
//             active={activeTab === "UPCOMING"}
//             onClick={() => setActiveTab("UPCOMING")}
//             count={initialUpcoming.length}
//             label="Upcoming Queue"
//           />
//           <TabButton
//             active={activeTab === "HISTORY"}
//             onClick={() => setActiveTab("HISTORY")}
//             count={initialHistory.length}
//             label="Execution History"
//           />
//         </div>

//         {/* Search */}
//         <div className="relative group">
//           <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
//           <input
//             type="text"
//             placeholder="Search content or ID..."
//             className="h-8 w-full sm:w-64 bg-transparent border border-zinc-800 rounded-md pl-8 pr-3 text-xs text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 focus:bg-zinc-900/50 transition-all"
//           />
//         </div>
//       </div>

//       {/* --- TABLE CONTAINER --- */}
//       <div className="border border-zinc-800 rounded-xl bg-zinc-900/20 overflow-hidden shadow-sm backdrop-blur-sm min-h-[400px]">
//         {/* Table Header */}
//         <div className="grid grid-cols-12 gap-4 px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/50 text-[10px] uppercase tracking-wider font-semibold text-zinc-500">
//           <div className="col-span-3 sm:col-span-2">Scheduled</div>
//           <div className="col-span-6 sm:col-span-7">Content</div>
//           <div className="col-span-3 sm:col-span-3 text-right pr-2">Status</div>
//         </div>

//         {/* List Items */}
//         <div className="divide-y divide-zinc-800/50">
//           {items.length === 0 ? (
//             <EmptyState type={activeTab} />
//           ) : (
//             items.map((task) => (
//               <TaskRow
//                 key={task.id}
//                 task={task}
//                 expanded={expandedRow === task.id}
//                 onToggle={() =>
//                   setExpandedRow(expandedRow === task.id ? null : task.id)
//                 }
//               />
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- SUB-COMPONENTS ---

// function TaskRow({
//   task,
//   expanded,
//   onToggle,
// }: {
//   task: any;
//   expanded: boolean;
//   onToggle: () => void;
// }) {
//   // Logic to extract status from the specific execution or the task itself
//   const execution = task.executions?.[0];
//   const status = execution?.status || task.status; // Fallback to task status if no execution row yet
//   const isFailed = status === "FAILED";
//   const date = new Date(task.scheduledAt);

//   return (
//     <div
//       className={`group transition-colors ${expanded ? "bg-zinc-900/80" : "hover:bg-zinc-900/40"}`}
//     >
//       <div
//         onClick={isFailed ? onToggle : undefined}
//         className={`grid grid-cols-12 gap-4 px-4 py-3 items-center ${isFailed ? "cursor-pointer" : ""}`}
//       >
//         {/* Time Column */}
//         <div className="col-span-3 sm:col-span-2 flex flex-col justify-center">
//           <span className="text-xs font-mono text-zinc-300">
//             {format(date, "MMM dd")}
//           </span>
//           <span className="text-[10px] font-mono text-zinc-600">
//             {format(date, "HH:mm")}
//           </span>
//         </div>

//         {/* Content Column */}
//         <div className="col-span-6 sm:col-span-7 pr-4">
//           <p className="text-xs sm:text-sm text-zinc-300 truncate font-medium group-hover:text-zinc-100 transition-colors">
//             {task.content}
//           </p>
//           <div className="flex items-center gap-2 mt-1">
//             <span className="text-[10px] text-zinc-600 font-mono tracking-tight">
//               ID: {task.id.slice(-8)}
//             </span>
//             {isFailed && (
//               <span className="flex items-center gap-1 text-[10px] text-red-400/80">
//                 <ChevronRight
//                   className={`w-3 h-3 transition-transform ${expanded ? "rotate-90" : ""}`}
//                 />
//                 View Error Log
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Status Column */}
//         <div className="col-span-3 sm:col-span-3 flex justify-end items-center gap-2">
//           <StatusBadge status={status} />
//           <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-zinc-800 rounded transition-all text-zinc-500 hover:text-white">
//             <MoreHorizontal className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       {/* Expanded Error Panel */}
//       {expanded && isFailed && (
//         <div className="px-4 pb-4 pt-0 animate-in slide-in-from-top-1 duration-200">
//           <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-3 ml-0 sm:ml-[16.6%]">
//             <div className="flex items-start gap-3">
//               <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
//               <div className="space-y-1 w-full">
//                 <p className="text-xs font-semibold text-red-400">
//                   Execution Failed
//                 </p>
//                 <p className="text-xs text-red-400/70 font-mono break-all leading-relaxed">
//                   {execution?.error ||
//                     "Unknown system error occurred during worker execution."}
//                 </p>
//                 <div className="pt-2 flex gap-3">
//                   <button className="text-[10px] font-medium text-red-400 hover:text-red-300 underline decoration-red-500/30">
//                     Retry Task
//                   </button>
//                   <button className="text-[10px] font-medium text-red-400 hover:text-red-300 underline decoration-red-500/30">
//                     Copy Trace ID
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function StatusBadge({ status }: { status: string }) {
//   switch (status) {
//     case "SUCCESS":
//     case "COMPLETED":
//       return (
//         <div className="flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10">
//           <CheckCircle2 className="w-3 h-3 text-emerald-500" />
//           <span className="text-[10px] font-medium text-emerald-500">SENT</span>
//         </div>
//       );
//     case "FAILED":
//       return (
//         <div className="flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-full bg-red-500/5 border border-red-500/10">
//           <XCircle className="w-3 h-3 text-red-500" />
//           <span className="text-[10px] font-medium text-red-500">FAILED</span>
//         </div>
//       );
//     case "RUNNING":
//       return (
//         <div className="flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-full bg-blue-500/5 border border-blue-500/10">
//           <Loader2 className="w-3 h-3 text-blue-500 animate-spin" />
//           <span className="text-[10px] font-medium text-blue-500">SENDING</span>
//         </div>
//       );
//     default: // PENDING
//       return (
//         <div className="flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-full bg-zinc-500/5 border border-zinc-500/10">
//           <Clock className="w-3 h-3 text-zinc-500" />
//           <span className="text-[10px] font-medium text-zinc-500">QUEUED</span>
//         </div>
//       );
//   }
// }

// function TabButton({ active, onClick, count, label }: any) {
//   return (
//     <button
//       onClick={onClick}
//       className={`
//         flex items-center gap-2 px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-200
//         ${active ? "bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30"}
//       `}
//     >
//       {label}
//       <span
//         className={`px-1.5 py-0.5 rounded text-[10px] ${active ? "bg-zinc-700 text-zinc-300" : "bg-zinc-800 text-zinc-600"}`}
//       >
//         {count}
//       </span>
//     </button>
//   );
// }

// function EmptyState({ type }: { type: string }) {
//   return (
//     <div className="flex flex-col items-center justify-center py-20">
//       <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mb-3 border border-zinc-800">
//         <Filter className="w-5 h-5 text-zinc-600" />
//       </div>
//       <h3 className="text-sm font-medium text-zinc-400">
//         {type === "UPCOMING" ? "Queue is clear" : "No history yet"}
//       </h3>
//       <p className="text-xs text-zinc-600 mt-1">
//         {type === "UPCOMING"
//           ? "Great job! No pending tasks."
//           : "Processed tasks will appear here."}
//       </p>
//     </div>
//   );
// }

"use client";

import { useState, useTransition } from "react";
import { fetchMoreTasks } from "@/app/actions/schedule-actions"; // Import the server action created in step 1
import {
  Twitter,
  Linkedin,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Filter,
  RefreshCw,
  MoreHorizontal,
  Search,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";

interface ScheduleFeedProps {
  initialUpcoming: any[];
  initialHistory: any[];
  platformName: string;
  platformKey: string;
  isConnected: boolean;
}

export default function ScheduleFeed({
  initialUpcoming,
  initialHistory,
  platformName,
  platformKey,
  isConnected,
}: ScheduleFeedProps) {
  console.log("intital history: ", initialHistory);
  console.log("intital history: ", initialUpcoming.length);
  let history: any = initialHistory.length > 1 ? "HISTORY" : "UPCOMING";
  const [activeTab, setActiveTab] = useState<"UPCOMING" | "HISTORY">(history);

  // State for Lists
  const [upcomingItems, setUpcomingItems] = useState(initialUpcoming);
  const [historyItems, setHistoryItems] = useState(initialHistory);

  // State for Load More Button
  const [hasMoreUpcoming, setHasMoreUpcoming] = useState(
    initialUpcoming.length >= 5,
  );
  const [hasMoreHistory, setHasMoreHistory] = useState(
    initialHistory.length >= 5,
  );

  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Derived state based on active tab
  const items = activeTab === "UPCOMING" ? upcomingItems : historyItems;
  const hasMore = activeTab === "UPCOMING" ? hasMoreUpcoming : hasMoreHistory;

  const handleLoadMore = () => {
    startTransition(async () => {
      // Calculate current offset based on what's already shown
      const currentCount =
        activeTab === "UPCOMING" ? upcomingItems.length : historyItems.length;

      // Call Server Action
      const newTasks = await fetchMoreTasks(
        platformKey,
        activeTab,
        currentCount,
      );

      if (activeTab === "UPCOMING") {
        setUpcomingItems((prev) => [...prev, ...newTasks]);
        if (newTasks.length < 5) setHasMoreUpcoming(false);
      } else {
        setHistoryItems((prev) => [...prev, ...newTasks]);
        if (newTasks.length < 5) setHasMoreHistory(false);
      }
    });
  };

  const PlatformIcon = platformName.includes("Twitter") ? Twitter : Linkedin;

  return (
    <div className="min-h-screen bg-black text-zinc-200 font-sans selection:bg-zinc-800">
      {/* --- HEADER --- */}
      <header className="mb-8 flex items-end justify-between border-b border-zinc-800/60 pb-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 flex items-center justify-center shadow-inner">
            <PlatformIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white tracking-tight">
              {platformName} Integration
            </h1>
            <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1 font-mono">
              {isConnected ? (
                <span className="bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> CONNECTED
                </span>
              ) : (
                <span className="bg-red-500/10 text-red-500 px-1.5 py-0.5 rounded border border-red-500/20 flex items-center gap-1">
                  <XCircle className="w-3 h-3" /> DISCONNECTED
                </span>
              )}
              <span>•</span>
              <span>LATENCY: 24ms</span>
            </div>
          </div>
        </div>
      </header>

      {/* --- CONTROLS --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="bg-zinc-900/50 p-1 rounded-lg border border-zinc-800/60 inline-flex w-full sm:w-auto">
          <TabButton
            active={activeTab === "UPCOMING"}
            onClick={() => setActiveTab("UPCOMING")}
            count={upcomingItems.length}
            label="Upcoming Queue"
          />
          <TabButton
            active={activeTab === "HISTORY"}
            onClick={() => setActiveTab("HISTORY")}
            count={historyItems.length}
            label="Execution History"
          />
        </div>

        <div className="relative group">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
          <input
            type="text"
            placeholder="Search content or ID..."
            className="h-8 w-full sm:w-64 bg-transparent border border-zinc-800 rounded-md pl-8 pr-3 text-xs text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 focus:bg-zinc-900/50 transition-all"
          />
        </div>
      </div>

      {/* --- TABLE CONTAINER --- */}
      <div className="border border-zinc-800 rounded-xl bg-zinc-900/20 overflow-hidden shadow-sm backdrop-blur-sm min-h-[400px] flex flex-col">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/50 text-[10px] uppercase tracking-wider font-semibold text-zinc-500">
          <div className="col-span-3 sm:col-span-2">Scheduled</div>
          <div className="col-span-6 sm:col-span-7">Content</div>
          <div className="col-span-3 sm:col-span-3 text-right pr-2">Status</div>
        </div>

        {/* List Items */}
        <div className="divide-y divide-zinc-800/50 flex-1">
          {items.length === 0 ? (
            <EmptyState type={activeTab} />
          ) : (
            items.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                expanded={expandedRow === task.id}
                onToggle={() =>
                  setExpandedRow(expandedRow === task.id ? null : task.id)
                }
              />
            ))
          )}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="p-2 border-t border-zinc-800 bg-zinc-900/30">
            <button
              onClick={handleLoadMore}
              disabled={isPending}
              className="w-full py-2 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" /> Loading...
                </>
              ) : (
                <>
                  Load more activity <ChevronDown className="w-3 h-3" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function TaskRow({
  task,
  expanded,
  onToggle,
}: {
  task: any;
  expanded: boolean;
  onToggle: () => void;
}) {
  const execution = task.executions?.[0];
  const status = execution?.status || task.status;
  const isFailed = status === "FAILED";
  const date = new Date(task.scheduledAt);

  return (
    <div
      className={`group transition-colors ${expanded ? "bg-zinc-900/80" : "hover:bg-zinc-900/40"}`}
    >
      <div
        onClick={isFailed ? onToggle : undefined}
        className={`grid grid-cols-12 gap-4 px-4 py-3 items-center ${isFailed ? "cursor-pointer" : ""}`}
      >
        {/* Time Column */}
        <div className="col-span-3 sm:col-span-2 flex flex-col justify-center">
          <span className="text-xs font-mono text-zinc-300">
            {format(date, "MMM dd")}
          </span>
          <span className="text-[10px] font-mono text-zinc-600">
            {format(date, "HH:mm")}
          </span>
        </div>

        {/* Content Column */}
        <div className="col-span-6 sm:col-span-7 pr-4">
          <p className="text-xs sm:text-sm text-zinc-300 truncate font-medium group-hover:text-zinc-100 transition-colors">
            {task.content}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] text-zinc-600 font-mono tracking-tight">
              ID: {task.id.slice(-8)}
            </span>
            {isFailed && (
              <span className="flex items-center gap-1 text-[10px] text-red-400/80">
                <ChevronRight
                  className={`w-3 h-3 transition-transform ${expanded ? "rotate-90" : ""}`}
                />
                View Error Log
              </span>
            )}
          </div>
        </div>

        {/* Status Column */}
        <div className="col-span-3 sm:col-span-3 flex justify-end items-center gap-2">
          <StatusBadge status={status} />
          <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-zinc-800 rounded transition-all text-zinc-500 hover:text-white">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expanded Error Panel */}
      {expanded && isFailed && (
        <div className="px-4 pb-4 pt-0 animate-in slide-in-from-top-1 duration-200">
          <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-3 ml-0 sm:ml-[16.6%]">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div className="space-y-1 w-full">
                <p className="text-xs font-semibold text-red-400">
                  Execution Failed
                </p>
                <p className="text-xs text-red-400/70 font-mono break-all leading-relaxed">
                  {execution?.error ||
                    "Unknown system error occurred during worker execution."}
                </p>
                <div className="pt-2 flex gap-3">
                  <button className="text-[10px] font-medium text-red-400 hover:text-red-300 underline decoration-red-500/30">
                    Retry Task
                  </button>
                  <button className="text-[10px] font-medium text-red-400 hover:text-red-300 underline decoration-red-500/30">
                    Copy Trace ID
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "SUCCESS":
    case "COMPLETED":
      return (
        <div className="flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          <span className="text-[10px] font-medium text-emerald-500">SENT</span>
        </div>
      );
    case "FAILED":
      return (
        <div className="flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-full bg-red-500/5 border border-red-500/10">
          <XCircle className="w-3 h-3 text-red-500" />
          <span className="text-[10px] font-medium text-red-500">FAILED</span>
        </div>
      );
    case "RUNNING":
      return (
        <div className="flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-full bg-blue-500/5 border border-blue-500/10">
          <Loader2 className="w-3 h-3 text-blue-500 animate-spin" />
          <span className="text-[10px] font-medium text-blue-500">SENDING</span>
        </div>
      );
    default: // PENDING
      return (
        <div className="flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-full bg-zinc-500/5 border border-zinc-500/10">
          <Clock className="w-3 h-3 text-zinc-500" />
          <span className="text-[10px] font-medium text-zinc-500">QUEUED</span>
        </div>
      );
  }
}

function TabButton({ active, onClick, count, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-200
        ${active ? "bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30"}
      `}
    >
      {label}
      <span
        className={`px-1.5 py-0.5 rounded text-[10px] ${active ? "bg-zinc-700 text-zinc-300" : "bg-zinc-800 text-zinc-600"}`}
      >
        {count}
      </span>
    </button>
  );
}

function EmptyState({ type }: { type: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mb-3 border border-zinc-800">
        <Filter className="w-5 h-5 text-zinc-600" />
      </div>
      <h3 className="text-sm font-medium text-zinc-400">
        {type === "UPCOMING" ? "Queue is clear" : "No history yet"}
      </h3>
      <p className="text-xs text-zinc-600 mt-1">
        {type === "UPCOMING"
          ? "Great job! No pending tasks."
          : "Processed tasks will appear here."}
      </p>
    </div>
  );
}
