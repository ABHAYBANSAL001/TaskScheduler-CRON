import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function requireUser() {
  // 👇 THIS FUNCTION DOES THE MAGIC
  const session = await getServerSession(authOptions); 

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return session.user;
}