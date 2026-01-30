"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  X,
  Twitter,
  Linkedin,
  Clock,
  Calendar as CalendarIcon,
  ChevronDown,
  Lock,
  Check,
  Image as ImageIcon,
  Smile,
  Zap,
  Loader2,
  MoreHorizontal,
  Globe,
  AlertCircle,
} from "lucide-react";
import {
  format,
  addMinutes,
  addHours,
  addDays,
  nextMonday,
  isBefore,
} from "date-fns";
import { scheduleTask } from "@/app/actions/task-actions";

// --- Types ---
interface QuickPostProps {
  isXConnected: boolean;
  isLinkedinConnected: boolean;
  userImage?: string | null;
}

interface SchedulePreset {
  label: string;
  subLabel: string;
  getValue: () => Date;
}

// --- Helper: Get Local ISO String for Input Min Attribute ---
const getLocalISOString = (date: Date) => {
  const offset = date.getTimezoneOffset() * 60000; // offset in milliseconds
  const localDate = new Date(date.getTime() - offset);
  return localDate.toISOString().slice(0, 16); // Remove seconds/ms/Z
};

export default function ProfessionalScheduler({
  isXConnected,
  isLinkedinConnected,
  userImage,
}: QuickPostProps) {
  // --- State ---
  const [mounted, setMounted] = useState(false);
  const [content, setContent] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  // Media State
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);

  // Scheduling State
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [dateError, setDateError] = useState<string>("");

  // Emoji State
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // --- Refs ---
  const menuRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  // --- Constants ---
  const MAX_CHAR = 280;
  const COMMON_EMOJIS = [
    "😀",
    "🚀",
    "🔥",
    "💡",
    "✨",
    "🎉",
    "👍",
    "❤️",
    "🤔",
    "👀",
    "📈",
    "📅",
  ];

  // --- Presets (Memoized to prevent hydration mismatch) ---
  const presets: SchedulePreset[] = useMemo(() => {
    if (!mounted) return []; // Don't render times on server
    const now = new Date();
    return [
      {
        label: "In 10 minutes",
        subLabel: format(addMinutes(now, 10), "h:mm a"),
        getValue: () => addMinutes(new Date(), 10),
      },
      {
        label: "In 1 hour",
        subLabel: format(addHours(now, 1), "h:mm a"),
        getValue: () => addHours(new Date(), 1),
      },
      {
        label: "Tomorrow morning",
        subLabel: "9:00 AM",
        getValue: () => {
          const d = addDays(new Date(), 1);
          d.setHours(9, 0, 0, 0);
          return d;
        },
      },
      {
        label: "Next Monday",
        subLabel: "9:00 AM",
        getValue: () => {
          const d = nextMonday(new Date());
          d.setHours(9, 0, 0, 0);
          return d;
        },
      },
    ];
  }, [mounted]); // Only recalculate when mounted (client-side)

  // --- Effects ---

  // 1. Mount Check (Fixes Hydration Error)
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Click Outside Listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsScheduleOpen(false);
      }
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 3. Auto-resize Textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  // 4. Cleanup Object URLs (Memory Leak Fix)
  useEffect(() => {
    return () => {
      mediaPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [mediaPreviews]);

  // --- Handlers ---

  const togglePlatform = (platform: string) => {
    const isConnected =
      platform === "TWITTER" ? isXConnected : isLinkedinConnected;
    if (!isConnected) return;

    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform],
    );
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setMediaFiles((prev) => [...prev, ...files]);
      setMediaPreviews((prev) => [...prev, ...newPreviews]);

      // Reset input value so same file can be selected again if needed
      e.target.value = "";
    }
  };

  const removeMedia = (index: number) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
    setMediaPreviews((prev) => {
      const urlToRemove = prev[index];
      URL.revokeObjectURL(urlToRemove); // Clean up memory immediately
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleEmojiClick = (emoji: string) => {
    setContent((prev) => prev + emoji);
    setShowEmojiPicker(false);
    // Return focus to textarea to keep typing
    setTimeout(() => textareaRef.current?.focus(), 0);
  };

  // --- Date Handling ---
  const handleScheduleSelect = (date: Date) => {
    setScheduledDate(date);
    setDateError("");
    setIsScheduleOpen(false);
  };

  const handleCustomDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const selected = new Date(e.target.value);
      const now = new Date();

      if (isBefore(selected, now)) {
        setDateError("Cannot schedule in the past");
      } else {
        setDateError("");
        setScheduledDate(selected);
      }
    }
  };

  const clearSchedule = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScheduledDate(null);
    setDateError("");
  };

  // --- API Handling ---

  // Placeholder for Instant Post API
  const handleInstantPost = async (formData: FormData) => {
    // console.log("Calling Instant Post API...");
    // Replace this with your actual instant post server action
    await scheduleTask(formData);
  };

  const handleSubmit = async () => {
    if (!content.trim() && mediaFiles.length === 0) return;
    if (selectedPlatforms.length === 0) return;

    // Final check for past dates right before submission
    if (scheduledDate && isBefore(scheduledDate, new Date())) {
      setDateError("Date has passed. Update schedule.");
      return;
    }

    setIsPending(true);
    const formData = new FormData();

    // Build form data
    formData.append("content", content);
    selectedPlatforms.forEach((p) => formData.append(p, "on"));
    mediaFiles.forEach((file) => formData.append("media", file));

    try {
      if (scheduledDate) {
        // --- PATH A: SCHEDULED ---
        formData.set("scheduledAt", scheduledDate.toISOString());
        await scheduleTask(formData);
      } else {
        // --- PATH B: INSTANT POST ---
        await handleInstantPost(formData);
      }

      // Reset Form on success
      setContent("");
      setSelectedPlatforms([]);
      setMediaFiles([]);
      // Previews are cleaned up via useEffect, but good to clear state
      setMediaPreviews([]);
      setScheduledDate(null);
      setDateError("");
    } catch (error) {
      console.error("Failed to post", error);
      // Optional: Add a toast notification here
    } finally {
      setIsPending(false);
    }
  };

  // Derived State
  const charCount = content.length;
  const isOverLimit = charCount > MAX_CHAR;
  const isReady =
    (content.trim() || mediaFiles.length > 0) &&
    selectedPlatforms.length > 0 &&
    !isOverLimit &&
    !dateError;

  // Don't render until client-side hydration is complete to avoid text mismatches
  if (!mounted) return null;

  return (
    <div className="w-full bg-zinc-950 text-zinc-200 p-4 md:p-8 font-sans antialiased selection:bg-blue-500/30 flex justify-center">
      {/* --- Main Card --- */}
      <div className="w-full max-w-3xl relative bg-zinc-900/40 rounded-2xl border border-zinc-800 transition-all duration-300">
        <div className="p-6">
          <div className="flex gap-4">
            {/* User Avatar */}
            <div className="flex-shrink-0 pt-1">
              {userImage ? (
                <img
                  src={userImage}
                  className="w-10 h-10 rounded-full border border-zinc-800 shadow-sm object-cover"
                  alt="User"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[1px] shadow-lg shadow-purple-900/20">
                  <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center">
                    <span className="font-bold text-xs text-white">ME</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="flex-1 min-w-0">
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isPending}
                placeholder="What's on your mind? Draft a post..."
                className="w-full bg-transparent border-none text-lg text-zinc-100 placeholder:text-zinc-600 p-0 resize-none min-h-[80px] leading-relaxed focus:outline-none focus:ring-0 shadow-none"
                style={{ outline: "none", boxShadow: "none" }} // Inline style backup to force no border
              />

              {/* Media Previews */}
              {mediaPreviews.length > 0 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-800">
                  {mediaPreviews.map((src, index) => (
                    <div
                      key={index}
                      className="relative group shrink-0 animate-in fade-in zoom-in-95 duration-200"
                    >
                      <img
                        src={src}
                        alt="Preview"
                        className="h-24 w-auto rounded-lg border border-white/10 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeMedia(index)}
                        className="absolute -top-2 -right-2 p-1 bg-zinc-900 text-zinc-400 rounded-full border border-zinc-700 hover:text-red-400 hover:border-red-400 transition-colors shadow-lg cursor-pointer"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Toolbar */}
              <div className="flex items-center justify-between mt-4 relative">
                <div className="flex items-center gap-1">
                  {/* Hidden File Input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                  />
                  <IconButton
                    icon={<ImageIcon size={18} />}
                    tooltip="Add Media"
                    onClick={() => fileInputRef.current?.click()}
                  />

                  {/* Emoji Trigger */}
                  <div className="relative" ref={emojiRef}>
                    <IconButton
                      icon={<Smile size={18} />}
                      tooltip="Emoji"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    />

                    {/* Custom Emoji Picker */}
                    {showEmojiPicker && (
                      <div className="absolute top-full left-0 mt-2 bg-zinc-950 border border-zinc-800 rounded-xl shadow-xl p-3 z-50 w-64 grid grid-cols-6 gap-2 ring-1 ring-white/10">
                        {COMMON_EMOJIS.map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => handleEmojiClick(emoji)}
                            className="hover:bg-zinc-800 rounded p-1 text-xl transition-colors"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <IconButton
                    icon={<Zap size={18} />}
                    tooltip="AI Assist"
                    onClick={() => {}}
                  />
                </div>

                {/* Character Count */}
                <div className="flex items-center gap-2">
                  {isOverLimit && (
                    <span className="text-xs text-red-400 font-medium">
                      Too long
                    </span>
                  )}
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <svg
                      className="w-full h-full -rotate-90"
                      viewBox="0 0 36 36"
                    >
                      <path
                        className="text-zinc-800"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <path
                        className={`transition-all duration-300 ${isOverLimit ? "text-red-500" : "text-blue-500"}`}
                        strokeDasharray={`${Math.min((charCount / MAX_CHAR) * 100, 100)}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                    </svg>
                    <span className="absolute text-[9px] text-zinc-500 font-medium">
                      {MAX_CHAR - charCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-zinc-800 w-full" />

        {/* Footer / Controls */}
        <div className="px-6 py-4 bg-zinc-900/60 rounded-b-2xl flex items-center justify-between flex-wrap gap-4 backdrop-blur-sm">
          {/* Left: Platform Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mr-2">
              Post to
            </span>

            <PlatformPill
              icon={<Twitter size={14} />}
              label="X / Twitter"
              isConnected={isXConnected}
              isActive={selectedPlatforms.includes("TWITTER")}
              onClick={() => togglePlatform("TWITTER")}
              activeColor="text-sky-400"
            />

            <PlatformPill
              icon={<Linkedin size={14} />}
              label="LinkedIn"
              isConnected={isLinkedinConnected}
              isActive={selectedPlatforms.includes("LINKEDIN")}
              onClick={() => togglePlatform("LINKEDIN")}
              activeColor="text-blue-400"
            />

            <button
              type="button"
              className="w-7 h-7 ml-1 rounded-full border border-zinc-800 border-dashed flex items-center justify-center text-zinc-600 hover:text-zinc-400 hover:border-zinc-600 transition-colors"
            >
              <MoreHorizontal size={14} />
            </button>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Scheduled Date Indicator */}
            {scheduledDate && (
              <div
                className={`hidden sm:flex items-center gap-2 pl-3 pr-2 py-1.5 border rounded-lg animate-in slide-in-from-right-2 ${dateError ? "bg-red-500/10 border-red-500/20" : "bg-blue-500/10 border-blue-500/20"}`}
              >
                {dateError ? (
                  <AlertCircle size={13} className="text-red-400" />
                ) : (
                  <Clock size={13} className="text-blue-400" />
                )}

                <div className="flex flex-col">
                  <span
                    className={`text-[9px] font-semibold leading-none uppercase tracking-wide ${dateError ? "text-red-300" : "text-blue-300/70"}`}
                  >
                    {dateError ? "Invalid Date" : "Scheduled for"}
                  </span>
                  <span
                    className={`text-xs font-medium leading-tight ${dateError ? "text-red-200" : "text-blue-100"}`}
                  >
                    {dateError || format(scheduledDate, "MMM d, h:mm a")}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={clearSchedule}
                  className={`ml-2 p-1 rounded-md transition-colors ${dateError ? "hover:bg-red-500/20 text-red-300" : "hover:bg-blue-500/20 text-blue-300 hover:text-white"}`}
                >
                  <X size={12} />
                </button>
              </div>
            )}

            {/* Schedule Trigger Button */}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setIsScheduleOpen(!isScheduleOpen)}
                className={`
                    group flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border
                    ${
                      isScheduleOpen
                        ? "bg-zinc-800 text-white border-zinc-700"
                        : "bg-transparent text-zinc-400 border-transparent hover:bg-zinc-800 hover:text-zinc-200"
                    }
                `}
                title="Schedule Post"
              >
                <CalendarIcon size={18} className="group-hover:text-zinc-300" />
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${isScheduleOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              {isScheduleOpen && (
                <div className="absolute bottom-full right-0 mb-3 w-72 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 ring-1 ring-white/5">
                  <div className="p-1">
                    <div className="px-3 py-2 border-b border-zinc-900/50">
                      <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                        Quick Presets
                      </h3>
                    </div>
                    <div className="p-1 space-y-0.5">
                      {presets.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() =>
                            handleScheduleSelect(preset.getValue())
                          }
                          className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-900 text-left group transition-colors"
                        >
                          <span className="text-sm text-zinc-300 group-hover:text-white font-medium">
                            {preset.label}
                          </span>
                          <span className="text-xs text-zinc-600 group-hover:text-zinc-500">
                            {preset.subLabel}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="p-2 border-t border-zinc-900/50 bg-zinc-900/20">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <CalendarIcon size={12} className="text-zinc-500" />
                        </div>
                        <input
                          type="datetime-local"
                          ref={dateInputRef}
                          min={getLocalISOString(new Date())} // Correctly handles local timezone min limit
                          onChange={handleCustomDateChange}
                          className="block w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-900 border border-zinc-700 rounded-md text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isPending || !isReady}
              className={`
                relative overflow-hidden flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-black shadow-lg transition-all duration-300 group
                ${
                  isReady
                    ? "bg-white hover:bg-zinc-200 hover:scale-[1.02] hover:shadow-white/10"
                    : "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50"
                }
              `}
            >
              {isPending ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : scheduledDate ? (
                <>
                  <span>Schedule</span>
                  <Clock size={14} className="opacity-60" />
                </>
              ) : (
                <>
                  <span>Post Now</span>
                  <Globe
                    size={14}
                    className="opacity-60 group-hover:translate-x-0.5 transition-transform"
                  />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Sub-Components ---

function PlatformPill({
  icon,
  label,
  isActive,
  isConnected,
  onClick,
  activeColor,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isConnected: boolean;
  onClick: () => void;
  activeColor: string;
}) {
  if (!isConnected) {
    return (
      <div className="relative group">
        <button
          type="button"
          disabled
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-800/60 bg-zinc-900/30 text-zinc-600 cursor-not-allowed grayscale opacity-60 transition-all hover:bg-zinc-900"
        >
          {icon}
          <span className="text-xs font-medium hidden sm:inline">{label}</span>
          <Lock size={10} className="ml-0.5 opacity-50" />
        </button>
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-zinc-950 border border-red-900/30 text-red-100 text-[10px] rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 text-center">
          <p className="font-semibold">Account Disconnected</p>
          <p className="text-zinc-500">Check your settings.</p>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-200 group
        ${
          isActive
            ? `bg-zinc-800 border-zinc-700 text-white shadow-sm`
            : "bg-transparent border-zinc-800 text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
        }
      `}
    >
      <div
        className={`${isActive ? activeColor : "text-zinc-500"} transition-colors`}
      >
        {icon}
      </div>
      <span className="hidden sm:inline">{label}</span>
      {isActive && <Check size={10} className="ml-0.5 text-zinc-400" />}
    </button>
  );
}

function IconButton({
  icon,
  tooltip,
  onClick,
}: {
  icon: React.ReactNode;
  tooltip: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative p-2 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors"
    >
      {icon}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        {tooltip}
      </span>
    </button>
  );
}
