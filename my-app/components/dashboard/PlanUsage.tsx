import { redis } from "@/lib/redis";
import { requireUser } from "@/lib/session";
import { Zap } from "lucide-react";

export default async function PlanUsage() {
  const user = await requireUser();
  const key = `user:${user.id}:post_count`;
  const usage = (await redis.get<number>(key)) || 0;
  const LIMIT = 10;

  // Calculate percentage for progress bar
  const percent = Math.min((usage / LIMIT) * 100, 100);

  // Color logic: Green -> Yellow -> Red
  let progressColor = "bg-blue-500";
  if (percent > 70) progressColor = "bg-amber-500";
  if (percent >= 100) progressColor = "bg-red-500";

  return (
    <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-zinc-800 rounded-md text-yellow-500">
            <Zap className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="text-sm font-bold text-white">Free Plan</span>
        </div>
        <span className="text-xs font-mono text-zinc-400">
          {usage} / {LIMIT} Used
        </span>
      </div>

      {/* Progress Bar Track */}
      <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${progressColor} transition-all duration-1000 ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {usage >= LIMIT ? (
        <button className="mt-4 w-full py-2 text-xs font-bold text-black bg-white rounded-lg hover:bg-zinc-200 transition">
          Upgrade for Unlimited
        </button>
      ) : (
        <p className="mt-3 text-[10px] text-zinc-500">
          You have {LIMIT - usage} posts remaining for lifetime.
        </p>
      )}
    </div>
  );
}
