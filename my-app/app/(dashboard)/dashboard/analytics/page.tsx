import { requireUser } from "@/lib/session";
import { prisma } from "@/lib/db";
import {
  CheckCircle2,
  XCircle,
  Zap,
  Activity,
  Twitter,
  Linkedin,
  ArrowUpRight,
  LayoutGrid,
  Clock,
} from "lucide-react";

export default async function AnalyticsPage() {
  const user = await requireUser();

  const [
    totalCount,
    successCount,
    failedCount,
    twitterCount,
    linkedinCount,
    recentLogs,
  ] = await Promise.all([
    prisma.taskExecution.count({ where: { task: { userId: user.id } } }),
    prisma.taskExecution.count({
      where: { task: { userId: user.id }, status: "SUCCESS" },
    }),
    prisma.taskExecution.count({
      where: { task: { userId: user.id }, status: "FAILED" },
    }),
    prisma.taskExecution.count({
      where: { task: { userId: user.id }, platform: "TWITTER" },
    }),
    prisma.taskExecution.count({
      where: { task: { userId: user.id }, platform: "LINKEDIN" },
    }),
    prisma.taskExecution.findMany({
      where: { task: { userId: user.id } },
      orderBy: { finishedAt: "desc" },
      take: 6,
      include: { task: { select: { content: true } } },
    }),
  ]);

  const successRate =
    totalCount > 0 ? Math.round((successCount / totalCount) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto  p-2">
      {/* --- TIGHT HEADER --- */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/5 rounded-lg">
            <LayoutGrid className="w-4 h-4 text-zinc-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white tracking-tight">
              Analytics
            </h1>
            <p className="text-xs text-zinc-500">
              Pipeline performance and delivery metrics
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1 bg-emerald-500/5 border border-emerald-500/10 rounded-md text-[10px] font-medium text-emerald-500 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </div>
      </div>

      {/* --- COMPACT KPI GRID --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard
          label="Success Rate"
          value={`${successRate}%`}
          icon={<Activity className="w-3.5 h-3.5" />}
          color="text-emerald-400"
        />
        <KpiCard
          label="Total Processed"
          value={totalCount}
          icon={<Zap className="w-3.5 h-3.5" />}
          color="text-zinc-400"
        />
        <KpiCard
          label="Twitter posts"
          value={twitterCount}
          icon={<Twitter className="w-3.5 h-3.5" />}
          color="text-blue-400"
        />
        <KpiCard
          label="Failures"
          value={failedCount}
          icon={<XCircle className="w-3.5 h-3.5" />}
          color="text-red-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* --- PLATFORM STATS (DENSE) --- */}
        <div className="lg:col-span-2 bg-zinc-900/40 border border-white/5 rounded-xl p-4">
          <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-4">
            Channel Distribution
          </h3>
          <div className="space-y-4">
            <DistributionBar
              label="X (Twitter)"
              count={twitterCount}
              total={totalCount}
              icon={<Twitter className="w-3.5 h-3.5" />}
              barColor="bg-white"
            />
            <DistributionBar
              label="LinkedIn"
              count={linkedinCount}
              total={totalCount}
              icon={<Linkedin className="w-3.5 h-3.5" />}
              barColor="bg-[#0A66C2]"
            />
          </div>
        </div>

        {/* --- ACTIVITY LOG (TIGHT LIST) --- */}
        <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
              Recent
            </h3>
            <Clock className="w-3 h-3 text-zinc-600" />
          </div>

          <div className="space-y-3 flex-1">
            {recentLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between group border-b border-white/[0.02] pb-2 last:border-0"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <div
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${log.status === "SUCCESS" ? "bg-emerald-500" : "bg-red-500"}`}
                  />
                  <span className="text-xs text-zinc-400 truncate group-hover:text-zinc-200 transition-colors">
                    {log.task.content}
                  </span>
                </div>
                <span className="text-[10px] text-zinc-600 font-mono shrink-0 ml-2">
                  {new Date(log.finishedAt || Date.now()).toLocaleTimeString(
                    [],
                    { hour: "2-digit", minute: "2-digit" },
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* <button className="mt-3 pt-3 border-t border-white/5 text-[10px] text-zinc-500 hover:text-white flex items-center gap-1 transition-colors">
            View History <ArrowUpRight className="w-2.5 h-2.5" />
          </button> */}
        </div>
      </div>
    </div>
  );
}

// --- SMALLER COMPONENTS ---

function KpiCard({ label, value, icon, color }: any) {
  return (
    <div className="p-3.5 bg-zinc-900/40 border border-white/5 rounded-xl hover:bg-zinc-800/40 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <div className={`p-1.5 bg-zinc-800/50 rounded-md ${color}`}>{icon}</div>
        <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-tight">
          {label}
        </span>
      </div>
      <div className="text-xl font-bold text-white tabular-nums tracking-tight">
        {value}
      </div>
    </div>
  );
}

function DistributionBar({ label, count, total, barColor, icon }: any) {
  const percent = total > 0 ? (count / total) * 100 : 0;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-[11px]">
        <div className="flex items-center gap-2 text-zinc-300">
          <span className="text-zinc-500">{icon}</span>
          <span className="font-medium">{label}</span>
        </div>
        <div className="text-zinc-500 font-mono">
          {count} <span className="text-zinc-700 mx-1">/</span>{" "}
          {Math.round(percent)}%
        </div>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-700 ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
