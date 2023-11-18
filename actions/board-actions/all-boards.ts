"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function allBoards() {
  const session = await auth();

  return await prisma.board.findMany({
    where: {
      user: {
        email: session?.user?.email as string,
      },
    },
  });
}
