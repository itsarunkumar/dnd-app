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
      board: {
        connect: {
          id: data.get("boardId") as string,
        },
      },
    },
  });

  revalidatePath("/app");
}

export async function getTables(boardId: string) {
  const session = await auth();

  return await prisma.table.findMany({
    where: {
      user: {
        email: session?.user?.email as string,
      },
      boardId: boardId,
    },
    include: {
      cards: true,
    },
  });
}

export async function deleteTable(tableId: string) {
  await prisma.table.delete({
    where: {
      id: tableId,
    },
  });

  revalidatePath("/app");
}

type createCardData = {
  name: string;
  description: string;
  tableId: string;
};

export async function createCard({
  name,
  description,
  tableId,
}: createCardData) {
  await prisma.card.create({
    data: {
      name: name,
      description: description,
      tableId: tableId,
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

export async function updateCardData(data: FormData) {
  await prisma.card.update({
    where: {
      id: data.get("cardId") as string,
    },
    data: {
      name: data.get("card") as string,
      description: data.get("description") as string,
    },
  });

  revalidatePath("/board");
}

export async function deleteCard(cardID: string, tableId: string) {
  await prisma.card.delete({
    where: {
      id: cardID,
      tableId: tableId,
    },
  });
}
