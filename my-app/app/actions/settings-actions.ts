"use server";

import { requireUser } from "@/lib/session";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// 1. Update Profile
export async function updateProfile(formData: FormData) {
  const user = await requireUser();
  const name = formData.get("name") as string;
  const timezone = formData.get("timezone") as string;

  await prisma.user.update({
    where: { id: user.id },
    data: { name, timezone }
  });

  revalidatePath("/dashboard/settings");
  return { success: true };
}

// 2. Disconnect Platform
export async function disconnectPlatform(platform: string) {
  const user = await requireUser();

  // Convert "TWITTER" -> "TWITTER" enum
  // We delete the entry from PlatformAccount
  await prisma.platformAccount.deleteMany({
    where: {
      userId: user.id,
      platform: platform as any
    }
  });

  revalidatePath("/dashboard/settings");
  return { success: true };
}

// 3. Delete Account (Danger Zone)
export async function deleteAccount() {
  const user = await requireUser();

  await prisma.user.delete({
    where: { id: user.id }
  });

  redirect("/");
}