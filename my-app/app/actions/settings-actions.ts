"use server";

import { requireUser } from "@/lib/session"; // Use the helper you provided
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- 1. Update Profile (Name & Timezone) ---
export async function updateProfile(formData: { name: string; timezone: string }) {
  const user = await requireUser();
  if(!user){
    return  { success: false, message: "UnAuthorized" };
  }

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: formData.name,
        timezone: formData.timezone,
      },
    });

    revalidatePath("/dashboard/settings");
    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    return { success: false, message: "Failed to update profile" };
  }
}

// --- 2. Disconnect a Platform (Twitter/LinkedIn) ---
export async function disconnectPlatform(platform: "TWITTER" | "LINKEDIN") {
  const user = await requireUser();

  try {
    // Delete the connection for this specific user and platform
    await prisma.platformAccount.deleteMany({
      where: {
        userId: user.id,
        platform: platform,
      },
    });

    revalidatePath("/dashboard/settings");
    return { success: true, message: `Disconnected ${platform} successfully` };
  } catch (error) {
    console.error("Disconnect error:", error);
    return { success: false, message: "Failed to disconnect account" };
  }
}

// --- 3. Delete Entire Account (Danger Zone) ---
export async function deleteUserAccount() {
  const user = await requireUser();

  try {
    // Cascade delete handles accounts, tasks, etc.
    await prisma.user.delete({
      where: { id: user.id },
    });
    
    // We don't return here because we redirect
  } catch (error) {
    return { success: false, message: "Failed to delete account" };
  }
  
  // Redirect must happen outside try/catch in Server Actions
  redirect("/"); 
}