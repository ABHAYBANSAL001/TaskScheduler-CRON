// // import { requireUser } from "@/lib/session";
// // import { prisma } from "@/lib/db";
// // import { notFound } from "next/navigation";
// // import { Twitter, Linkedin, CheckCircle2, Clock, XCircle } from "lucide-react";

// // // Platform Map for UI
// // const PLATFORM_CONFIG: any = {
// //   twitter: { name: "X (Twitter)", icon: Twitter, color: "text-white" },
// //   linkedin: { name: "LinkedIn", icon: Linkedin, color: "text-[#0A66C2]" },
// // };

// // export default async function PlatformSchedulePage({
// //   params,
// // }: {
// //   params: { platform: string };
// // }) {
// //   //   const { platform } = await params;
// //   const resolvedParams = await params;
// //   const platform = resolvedParams.platform;
// //   const user = await requireUser();
// //   //   const platformKey = await params.platform;
// //   const platformKey = platform.toLowerCase();
// //   //   console.log("schedule:platform:", params);
// //   //   console.log("schedule:platform:", params);
// //   // const platformKey = "twitter";
// //   //   console.log("platformKey", platformKey);

// //   if (!PLATFORM_CONFIG[platformKey]) return notFound();

// //   const PlatformIcon = PLATFORM_CONFIG[platformKey].icon;
// //   const dbPlatform = platformKey.toUpperCase(); // "twitter" -> "TWITTER"

// //   // Fetch Tasks relevant to this platform
// //   // We look for tasks where the 'executions' list contains this platform
// //   const tasks = await prisma.task.findMany({
// //     where: {
// //       userId: user.id,
// //       executions: {
// //         some: { platform: dbPlatform as any },
// //       },
// //     },
// //     include: {
// //       executions: {
// //         where: { platform: dbPlatform as any }, // Only get the execution status for this platform
// //       },
// //     },
// //     orderBy: { scheduledAt: "desc" },
// //   });

// //   //   console.log("taskes:", tasks);

// //   const upcoming = tasks.filter(
// //     (t) =>
// //       t.executions[0].status === "PENDING" ||
// //       t.executions[0].status === "RUNNING",
// //   );

// //   const history = tasks.filter(
// //     (t) =>
// //       t.executions[0].status === "SUCCESS" ||
// //       t.executions[0].status === "FAILED",
// //   );

// //   return (
// //     <div className="max-w-5xl mx-auto space-y-8">
// //       {/* Header */}
// //       <div className="flex items-center gap-4 border-b border-white/10 pb-6">
// //         <div className="p-3 bg-zinc-900 rounded-xl border border-white/10">
// //           <PlatformIcon
// //             className={`w-8 h-8 ${PLATFORM_CONFIG[platformKey].color}`}
// //           />
// //         </div>
// //         <div>
// //           <h1 className="text-2xl font-bold text-white">
// //             {PLATFORM_CONFIG[platformKey].name} Schedule
// //           </h1>
// //           <p className="text-zinc-400 text-sm">
// //             Manage your upcoming and past posts for this platform.
// //           </p>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //         {/* UPCOMING COLUMN */}
// //         <section>
// //           <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-4 flex items-center gap-2">
// //             <Clock className="w-4 h-4" /> Upcoming Queue
// //           </h2>
// //           <div className="space-y-3">
// //             {upcoming.length === 0 && <EmptyState text="No upcoming posts" />}
// //             {upcoming.map((task) => (
// //               <TaskCard key={task.id} task={task} isHistory={false} />
// //             ))}
// //           </div>
// //         </section>

// //         {/* HISTORY COLUMN */}
// //         <section>
// //           <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">
// //             Past History
// //           </h2>
// //           <div className="space-y-3">
// //             {history.length === 0 && <EmptyState text="No history yet" />}
// //             {history.map((task) => (
// //               <TaskCard key={task.id} task={task} isHistory={true} />
// //             ))}
// //           </div>
// //         </section>
// //       </div>
// //     </div>
// //   );
// // }

// // function TaskCard({ task, isHistory }: any) {
// //   const execution = task.executions[0]; // Specific execution for this platform
// //   const isError = execution.status === "FAILED";

// //   return (
// //     <div
// //       className={`p-4 rounded-xl border ${isHistory ? "bg-zinc-900/30 border-white/5 opacity-80" : "bg-zinc-900 border-white/10"} hover:border-white/20 transition`}
// //     >
// //       <div className="flex justify-between items-start mb-2">
// //         <span className="text-xs font-mono text-zinc-500">
// //           {new Date(task.scheduledAt).toLocaleString()}
// //         </span>
// //         <StatusBadge status={execution.status} />
// //       </div>
// //       <p className="text-sm text-zinc-200 line-clamp-3 leading-relaxed">
// //         {task.content}
// //       </p>
// //       {isError && execution.error && (
// //         <div className="mt-3 text-xs text-red-400 bg-red-400/10 p-2 rounded-lg border border-red-400/20">
// //           Error: {execution.error}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // function StatusBadge({ status }: { status: string }) {
// //   if (status === "SUCCESS")
// //     return (
// //       <span className="flex items-center gap-1 text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">
// //         <CheckCircle2 className="w-3 h-3" /> Sent
// //       </span>
// //     );
// //   if (status === "FAILED")
// //     return (
// //       <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded">
// //         <XCircle className="w-3 h-3" /> Failed
// //       </span>
// //     );
// //   return (
// //     <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded">
// //       <Clock className="w-3 h-3" /> Scheduled
// //     </span>
// //   );
// // }

// // function EmptyState({ text }: { text: string }) {
// //   return (
// //     <div className="p-8 text-center border border-dashed border-white/10 rounded-xl text-zinc-600 text-sm">
// //       {text}
// //     </div>
// //   );
// // }

// // // import { requireUser } from "@/lib/session";
// // // import { prisma } from "@/lib/db";
// // // import { notFound } from "next/navigation";
// // // import { Twitter, Linkedin } from "lucide-react";
// // // // import ScheduleFeed from "@/components/dashboard/ScheduleFeed"; // Import new component
// // // import ScheduleFeed from "@/components/dashboard/ScheduleFeed";

// // // const PLATFORM_CONFIG: any = {
// // //   twitter: {
// // //     name: "X (Twitter)",
// // //     icon: Twitter,
// // //     color: "text-white",
// // //     bg: "bg-black",
// // //   },
// // //   linkedin: {
// // //     name: "LinkedIn",
// // //     icon: Linkedin,
// // //     color: "text-white",
// // //     bg: "bg-[#0A66C2]",
// // //   },
// // // };

// // // export default async function PlatformSchedulePage({
// // //   params,
// // // }: {
// // //   params: { platform: string };
// // // }) {
// // //   const resolvedParams = await params;
// // //   const platformKey = resolvedParams.platform.toLowerCase();
// // //   const user = await requireUser();

// // //   if (!PLATFORM_CONFIG[platformKey]) return notFound();

// // //   const PlatformIcon = PLATFORM_CONFIG[platformKey].icon;
// // //   const dbPlatform = platformKey.toUpperCase();

// // //   // 1. Fetch Initial UPCOMING (First 5)
// // //   const initialUpcoming = await prisma.task.findMany({
// // //     where: {
// // //       userId: user.id,
// // //       executions: {
// // //         some: {
// // //           platform: dbPlatform as any,
// // //           status: { in: ["PENDING", "RUNNING"] },
// // //         },
// // //       },
// // //     },
// // //     include: { executions: { where: { platform: dbPlatform as any } } },
// // //     orderBy: { scheduledAt: "asc" }, // Upcoming should be ASC (soonest first)
// // //     take: 5,
// // //   });

// // //   // 2. Fetch Initial HISTORY (First 5)
// // //   const initialHistory = await prisma.task.findMany({
// // //     where: {
// // //       userId: user.id,
// // //       executions: {
// // //         some: {
// // //           platform: dbPlatform as any,
// // //           status: { in: ["SUCCESS", "FAILED"] },
// // //         },
// // //       },
// // //     },
// // //     include: { executions: { where: { platform: dbPlatform as any } } },
// // //     orderBy: { scheduledAt: "desc" }, // History should be DESC (newest first)
// // //     take: 5,
// // //   });

// // //   return (
// // //     <div className="max-w-4xl mx-auto pb-20">
// // //       {/* IMPRESSIVE HEADER */}
// // //       <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-8 mb-10">
// // //         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

// // //         <div className="relative flex items-center gap-6">
// // //           <div
// // //             className={`p-4 rounded-2xl shadow-2xl ${PLATFORM_CONFIG[platformKey].bg}`}
// // //           >
// // //             <PlatformIcon className="w-8 h-8 text-white" />
// // //           </div>
// // //           <div>
// // //             <h1 className="text-3xl font-bold text-white mb-2">
// // //               {PLATFORM_CONFIG[platformKey].name}
// // //             </h1>
// // //             <p className="text-zinc-400">
// // //               Manage your content pipeline. View upcoming queue and track
// // //               submission status.
// // //             </p>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* CLIENT COMPONENT (Handles Tabs & Load More) */}
// // //       <ScheduleFeed
// // //         initialUpcoming={initialUpcoming}
// // //         initialHistory={initialHistory}
// // //         platform={platformKey}
// // //       />
// // //     </div>
// // //   );
// // // }

// import { requireUser } from "@/lib/session";
// import { prisma } from "@/lib/db";
// import { notFound } from "next/navigation";
// // import ScheduleFeed from "@/components/dashboard/schedule/ScheduleFeed";
// import ScheduleFeed from "@/components/dashboard/ScheduleFeed";

// const PLATFORM_CONFIG: any = {
//   twitter: { name: "X (Twitter)" },
//   linkedin: { name: "LinkedIn" },
// };

// interface PageProps {
//   params: Promise<{ platform: string }>;
// }

// export default async function PlatformSchedulePage({ params }: PageProps) {
//   const { platform } = await params;
//   const user = await requireUser();
//   const platformKey = platform.toLowerCase();

//   if (!PLATFORM_CONFIG[platformKey]) return notFound();

//   const dbPlatform = platformKey.toUpperCase(); // "TWITTER"

//   // 1. Fetch Connection Status (For the header badge)
//   const connection = await prisma.platformAccount.findFirst({
//     where: {
//       userId: user.id,
//       platform: dbPlatform as any,
//     },
//   });

//   // 2. Fetch Tasks
//   const tasks = await prisma.task.findMany({
//     where: {
//       userId: user.id,
//       executions: {
//         some: { platform: dbPlatform as any },
//       },
//     },
//     include: {
//       executions: {
//         where: { platform: dbPlatform as any },
//       },
//     },
//     orderBy: { scheduledAt: "desc" },
//     take: 6,
//   });

//   // 3. Separate Data
//   const upcoming = tasks.filter((t) => {
//     const status = t.executions[0]?.status;
//     return status === "PENDING" || status === "RUNNING";
//   });

//   const history = tasks.filter((t) => {
//     const status = t.executions[0]?.status;
//     return status === "SUCCESS" || status === "FAILED";
//   });

//   return (
//     <ScheduleFeed
//       initialUpcoming={upcoming}
//       initialHistory={history}
//       platformName={PLATFORM_CONFIG[platformKey].name}
//       isConnected={!!connection}
//     />
//   );
// }

import { requireUser } from "@/lib/session";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import ScheduleFeed from "@/components/dashboard/ScheduleFeed";

const PLATFORM_CONFIG: any = {
  twitter: { name: "X (Twitter)" },
  linkedin: { name: "LinkedIn" },
};

interface PageProps {
  params: Promise<{ platform: string }>;
}

export default async function PlatformSchedulePage({ params }: PageProps) {
  const resolvedParams = await params;
  const platformKey = resolvedParams.platform.toLowerCase();

  if (!PLATFORM_CONFIG[platformKey]) return notFound();

  const user = await requireUser();
  const dbPlatform = platformKey.toUpperCase();

  // Limit initial fetch to 5 items per section
  const INITIAL_LIMIT = 5;

  // Run queries in parallel
  const [connection, upcoming, history] = await Promise.all([
    // 1. Check Connection
    prisma.platformAccount.findFirst({
      where: { userId: user.id, platform: dbPlatform as any },
      select: { id: true },
    }),

    // 2. Fetch Initial Upcoming (Soonest First)
    prisma.task.findMany({
      where: {
        userId: user.id,
        executions: {
          some: {
            platform: dbPlatform as any,
            status: { in: ["PENDING", "RUNNING"] },
          },
        },
      },
      include: { executions: { where: { platform: dbPlatform as any } } },
      orderBy: { scheduledAt: "asc" },
      take: INITIAL_LIMIT,
    }),

    // 3. Fetch Initial History (Newest First)
    prisma.task.findMany({
      where: {
        userId: user.id,
        executions: {
          some: {
            platform: dbPlatform as any,
            status: { in: ["SUCCESS", "FAILED"] },
          },
        },
      },
      include: { executions: { where: { platform: dbPlatform as any } } },
      orderBy: { scheduledAt: "desc" },
      take: INITIAL_LIMIT,
    }),
  ]);

  return (
    <ScheduleFeed
      initialUpcoming={upcoming}
      initialHistory={history}
      platformName={PLATFORM_CONFIG[platformKey].name}
      platformKey={platformKey} // Passed to client for server action
      isConnected={!!connection}
    />
  );
}
