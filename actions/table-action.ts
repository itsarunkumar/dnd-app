"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createTable(data: FormData) {
  const session = await auth();

  await prisma.table.create({
    data: {
      name: data.get("table") as string,
      user: {
        connect: {
          email: session?.user?.email as string,
        },
      },
    },
  });

  revalidatePath("/app");
}

export async function getTables() {
  const session = await auth();

  return await prisma.table.findMany({
    where: {
      user: {
        email: session?.user?.email as string,
      },
    },
    include: {
      cards: true,
    },
  });
}

export async function deleteTable() {}

export async function createCard(data: FormData) {
  const session = await auth();
  await prisma.card.create({
    data: {
      name: data.get("card") as string,
      description: data.get("description") as string,
      tableId: data.get("tableId") as string,
    },
  });

  revalidatePath("/app");
}

export async function updateCard(cardId: string, tableId: string) {
  await prisma.card.update({
    where: {
      id: cardId,
    },
    data: {
      tableId,
    },
  });

  revalidatePath("/app");
}

export async function deleteCard() {}
