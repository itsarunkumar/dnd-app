"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidateTag } from "next/cache";

const boardSchema = z.object({
  board: z
    .string({
      required_error: "Board name is required",
    })
    .min(1, {
      message: "name is too short",
    }),
});

export async function createBoard(data: FormData) {
  const session = await auth();

  const { board } = boardSchema.parse({
    board: data.get("board") as string,
  });

  try {
    await prisma.board.create({
      data: {
        name: board,
        user: {
          connect: {
            email: session?.user?.email as string,
          },
        },
      },
    });
  } catch (error) {
    console.log("error in createBoard", error);
  }

  revalidateTag("boards");
}
