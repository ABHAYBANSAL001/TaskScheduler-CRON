import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Plus, Linkedin, Twitter, MessageCircle } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // 1. Fetch Real Data
  // We use Promise.all to fetch everything in parallel (Fast!)
  // const [postsCount, upcomingPosts] = await Promise.all([
  //   // Count total posts
  //   // prisma.scheduledPost.count({
  //   //   where: { userId: session?.user.id as string },
  //   // }),
  //   // // Fetch next 3 scheduled posts
  //   // prisma.scheduledPost.findMany({
  //   //   where: {
  //   //     userId: session?.user.id as string,
  //   //     status: "PENDING",
  //   //   },
  //   //   orderBy: { scheduledAt: "asc" },
  //   //   take: 3,
  //   // }),
  // ]);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Overview</h1>
          <p className="text-zinc-400">
            Welcome back, {session?.user?.name?.split(" ")[0]}
          </p>
        </div>

        <Link
          href="/dashboard/create"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-medium transition shadow-lg shadow-blue-900/20"
        >
          <Plus className="w-5 h-5" />
          Create Post
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* <StatCard label="Total Posts" value={postsCount} />
        <StatCard label="Scheduled" value={upcomingPosts.length} /> */}
        <StatCard label="Connected Accounts" value={1} />{" "}
        {/* Placeholder until we link tables */}
      </div>

      {/* Upcoming Queue */}
      <div className="bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="font-semibold text-white">Upcoming Queue</h2>
          <Link
            href="/dashboard/schedule"
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            View all
          </Link>
        </div>
        {/* 
        {upcomingPosts.length === 0 ? (
          <div className="p-12 text-center text-zinc-500">
            <p>No posts scheduled.</p>
            <p className="text-sm mt-1">
              Create your first post to see it here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {upcomingPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 sm:p-6 hover:bg-white/5 transition flex gap-4 items-start"
              >
                <PlatformIcon platform={post.platform} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">
                      {new Date(post.scheduledAt).toLocaleString()}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                      {post.status}
                    </span>
                  </div>
                  <p className="text-zinc-300 text-sm line-clamp-2">
                    {post.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
}

// --- Helper Components ---

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-zinc-950 border border-white/10 p-6 rounded-2xl">
      <p className="text-zinc-500 text-sm font-medium mb-1">{label}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

function PlatformIcon({ platform }: { platform: string }) {
  // Simple switch for icons
  if (platform === "LINKEDIN")
    return (
      <div className="p-2 bg-[#0A66C2]/10 rounded-lg">
        <Linkedin className="w-5 h-5 text-[#0A66C2]" />
      </div>
    );
  if (platform === "TWITTER")
    return (
      <div className="p-2 bg-white/10 rounded-lg">
        <Twitter className="w-5 h-5 text-white" />
      </div>
    );
  if (platform === "WHATSAPP")
    return (
      <div className="p-2 bg-[#25D366]/10 rounded-lg">
        <MessageCircle className="w-5 h-5 text-[#25D366]" />
      </div>
    );
  return (
    <div className="p-2 bg-zinc-800 rounded-lg">
      <div className="w-5 h-5" />
    </div>
  );
}
