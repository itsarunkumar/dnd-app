"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath, revalidateTag } from "next/cache";

const boardSchema = z.object({
  boardId: z.string(),
});

export async function deleteBoard(data: FormData) {
  const session = await auth();

  const { boardId } = boardSchema.parse({
    boardId: data.get("boardId") as string,
  });

  try {
    await prisma.board.delete({
      where: {
        id: boardId,
      },
    });
  } catch (error) {
    console.log("error in delete board", error);
  }

  revalidatePath("/board");
}
