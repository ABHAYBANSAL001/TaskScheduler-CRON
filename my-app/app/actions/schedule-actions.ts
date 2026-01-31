// "use server";

// import { requireUser } from "@/lib/session"; // Or your auth check
// import { prisma } from "@/lib/db";

// const ITEMS_PER_PAGE = 5;

// export async function getPlatformPosts(
//   platform: string,
//   type: "UPCOMING" | "HISTORY",
//   page: number
// ) {
//   const user = await requireUser();
//   const dbPlatform = platform.toUpperCase();

//   // Define status filters based on tab
//   const statusFilter =
//     type === "UPCOMING"
//       ? { in: ["PENDING", "RUNNING"] }
//       : { in: ["SUCCESS", "FAILED"] };

//   const tasks = await prisma.task.findMany({
//     where: {
//       userId: user.id,
//       executions: {
//         some: {
//           platform: dbPlatform as any,
//           status: statusFilter as any,
//         },
//       },
//     },
//     include: {
//       executions: {
//         where: { platform: dbPlatform as any },
//       },
//     },
//     orderBy: { scheduledAt: "desc" },
//     take: ITEMS_PER_PAGE,
//     skip: (page - 1) * ITEMS_PER_PAGE,
//   });

//   return tasks;
// }

"use server";

import { requireUser } from "@/lib/session";
import { prisma } from "@/lib/db";

const ITEMS_PER_PAGE = 5;

export async function fetchMoreTasks(
  platformKey: string,
  type: "UPCOMING" | "HISTORY",
  offset: number
) {
  const user = await requireUser();
  const dbPlatform = platformKey.toUpperCase();

  // 1. Determine Filter based on Tab
  const statusFilter =
    type === "UPCOMING"
      ? { in: ["PENDING", "RUNNING"] }
      : { in: ["SUCCESS", "FAILED"] };

  // 2. Determine Sort (Upcoming = Soonest first, History = Newest first)
  const sortOrder = type === "UPCOMING" ? "asc" : "desc";

  // 3. Fetch Data
  const tasks = await prisma.task.findMany({
    where: {
      userId: user.id,
      executions: {
        some: {
          platform: dbPlatform as any,
          status: statusFilter as any,
        },
      },
    },
    include: {
      executions: {
        where: { platform: dbPlatform as any },
      },
    },
    orderBy: { scheduledAt: sortOrder },
    take: ITEMS_PER_PAGE,
    skip: offset,
  });

  return tasks;
}