// app/dashboard/settings/page.tsx
import { requireUser } from "@/lib/session";
import { prisma } from "@/lib/db";
import SettingsForm from "@/components/dashboard/settings/settingForm";

export default async function SettingsPage() {
  const user = await requireUser();

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      platformAccounts: { select: { platform: true, createdAt: true } },
    },
  });

  if (!dbUser) return null;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-0 ">
      <div className="flex flex-col md:mb-2 mb-4 border-b border-white/5 md:pb-1 pb-4">
        <h1 className="text-xl font-bold text-white tracking-tight">
          Settings
        </h1>
        <p className="text-xs text-zinc-500">
          Manage account preferences and system integrations.
        </p>
      </div>
      <SettingsForm user={dbUser} />
    </div>
  );
}
