"use server";

import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

const deleteCardSchema = z.object({
  cardId: z.string(),
  tableId: z.string(),
});

export async function deleteCard(data: z.infer<typeof deleteCardSchema>) {
  const { cardId, tableId } = deleteCardSchema.parse(data);

  try {
    const card = await prisma.card.delete({
      where: {
        id: cardId,
        tableId: tableId,
      },
    });

    revalidateTag("cards");

    return card;
  } catch (error) {
    console.log("error in delete card", error);
  }
}
