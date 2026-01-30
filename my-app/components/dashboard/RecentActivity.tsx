"use client";

import { useState } from "react";
import {
  CalendarClock,
  Twitter,
  Linkedin,
  MessageCircle,
  Edit3,
  Check,
  X,
  Loader2,
  Clock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { updateTaskContent } from "@/app/actions/update-tasks";

// --- Types ---
interface Execution {
  platform: "TWITTER" | "LINKEDIN" | "WHATSAPP";
}

interface Post {
  id: string;
  content: string;
  scheduledAt: string | Date;
  status: "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";
  executions?: Execution[];
}

export default function RecentActivity({ posts }: { posts: Post[] }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="w-full h-full min-h-[300px] bg-zinc-900/30 border border-zinc-800 border-dashed rounded-2xl flex flex-col items-center justify-center text-center p-8">
        <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4 shadow-inner">
          <CalendarClock className="w-8 h-8 text-zinc-700" />
        </div>
        <h3 className="text-zinc-300 font-medium mb-1">No posts in queue</h3>
        <p className="text-zinc-500 text-sm max-w-xs">
          Schedule your first post to see activity here.
        </p>
      </div>
    );
  }

  return (
    // Added: max-h-[600px] (adjust height as needed), overflow-y-auto, and custom scrollbar classes
    <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-800 hover:scrollbar-thumb-zinc-700 scrollbar-track-transparent">
      {posts.map((post) => (
        <ActivityItem key={post.id} post={post} />
      ))}
    </div>
  );
}

// --- Sub-Component: Individual Activity Item ---

function ActivityItem({ post }: { post: Post }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [isSaving, setIsSaving] = useState(false);

  // Status Helpers
  const isPending = post.status === "PENDING";
  const dateObj = new Date(post.scheduledAt);

  const handleSave = async () => {
    if (editContent.trim() === post.content) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    try {
      await updateTaskContent(post.id, editContent);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update post", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="group relative bg-zinc-900/30 hover:bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 p-4 rounded-2xl transition-all duration-300">
      <div className="flex items-start gap-4">
        {/* Platform Icon Column */}
        <div className="flex-shrink-0 pt-1">
          <PlatformStack executions={post.executions || []} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* Header: Date & Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-zinc-400">
                {isPending
                  ? `Scheduled for ${formatDistanceToNow(dateObj, { addSuffix: true })}`
                  : `Posted ${formatDistanceToNow(dateObj, { addSuffix: true })}`}
              </span>
            </div>
            <StatusBadge status={post.status} />
          </div>

          {/* Content: Display vs Edit Mode */}
          {isEditing ? (
            <div className="animate-in fade-in slide-in-from-top-1 duration-200">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full bg-zinc-950 border border-blue-500/50 rounded-lg p-3 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500/50 resize-none min-h-[80px]"
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditContent(post.content);
                  }}
                  disabled={isSaving}
                  className="px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving || !editContent.trim()}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors disabled:opacity-50"
                >
                  {isSaving ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <Check size={12} />
                  )}
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="relative group/content">
              <p className="text-zinc-300 text-sm leading-relaxed line-clamp-3 whitespace-pre-wrap">
                {post.content}
              </p>

              {/* Only show Edit button if Pending */}
              {isPending && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="absolute -right-2 -top-2 p-1.5 bg-zinc-800 text-zinc-400 rounded-lg opacity-0 group-hover/content:opacity-100 hover:text-white hover:bg-blue-600 hover:scale-105 transition-all shadow-lg"
                  title="Edit Post"
                >
                  <Edit3 size={12} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Helpers ---

const PlatformStack = ({ executions }: { executions: Execution[] }) => {
  const platforms = Array.from(
    new Set(executions?.map((e) => e.platform) || ["TWITTER"]),
  );

  const renderIcon = (platform: string) => {
    switch (platform) {
      case "TWITTER":
        return <Twitter size={14} className="text-white" />;
      case "LINKEDIN":
        return <Linkedin size={14} className="text-white" />;
      case "WHATSAPP":
        return <MessageCircle size={14} className="text-white" />;
      default:
        return <div className="w-2 h-2 bg-zinc-400 rounded-full" />;
    }
  };

  const getStyles = (platform: string) => {
    switch (platform) {
      case "TWITTER":
        return "bg-black border-zinc-800";
      case "LINKEDIN":
        return "bg-[#0A66C2] border-[#0A66C2]";
      case "WHATSAPP":
        return "bg-[#25D366] border-[#25D366]";
      default:
        return "bg-zinc-800 border-zinc-700";
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {platforms.map((p, i) => (
        <div
          key={i}
          className={`w-8 h-8 rounded-lg flex items-center justify-center border shadow-sm ${getStyles(p)}`}
          title={p}
        >
          {renderIcon(p)}
        </div>
      ))}
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const config = {
    PENDING: {
      color: "text-amber-400 bg-amber-400/10 border-amber-400/20",
      icon: <Clock size={10} />,
      label: "Pending",
    },
    COMPLETED: {
      color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      icon: <CheckCircle2 size={10} />,
      label: "Published",
    },
    FAILED: {
      color: "text-red-400 bg-red-400/10 border-red-400/20",
      icon: <AlertCircle size={10} />,
      label: "Failed",
    },
    CANCELLED: {
      color: "text-zinc-500 bg-zinc-500/10 border-zinc-500/20",
      icon: <X size={10} />,
      label: "Cancelled",
    },
  }[status] || {
    color: "text-zinc-500 bg-zinc-500/10",
    icon: <Clock size={10} />,
    label: status,
  };

  return (
    <div
      className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${config.color}`}
    >
      {config.icon}
      <span>{config.label}</span>
    </div>
  );
};
