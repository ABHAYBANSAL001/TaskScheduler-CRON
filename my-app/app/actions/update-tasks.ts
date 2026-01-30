"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db"; // or your DB
// import prisma

export async function updateTaskContent(taskId: string, newContent: string) {
  try {
    // 1. Update DB
    await prisma.task.update({
      where: { id: taskId },
      data: { content: newContent },
    });

    // 2. IMPORTANT: Revalidate the dashboard
    // This forces the dashboard page to reload data from the server
    // immediately after this action completes.
    revalidatePath("/dashboard"); 
    
    return { success: true };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update task");
  }
}