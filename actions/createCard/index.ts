import { z } from "zod";
import { revalidatePath } from "next/cache";

import { createTable as createTableSchema } from "./schema";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";

const handler = async ({ table }: InputType): Promise<ReturnType> => {
  const session = await auth();

  const newTable = await prisma.table.create({
    data: {
      name: table,
      user: {
        connect: {
          email: session?.user?.email as string,
        },
      },
    },
  });

  revalidatePath("/app");

  return {
    data: newTable,
  };
};

export const createTable = createSafeAction(createTableSchema, handler);
