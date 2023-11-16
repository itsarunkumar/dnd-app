"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";
import { auth } from "../lib/auth";

export async function createOrg(data: FormData) {
  const session = await auth();

  const org = await prisma.organisation.create({
    data: {
      name: data.get("orgname") as string,
      owner: {
        connect: {
          email: session?.user?.email as string,
        },
      },
    },
  });

  revalidatePath("/organisation");
}

export async function deleteOrg(data: FormData) {
  "use server";
  const orgid = data.get("orgid") as string;

  await prisma.organisation.delete({
    where: {
      id: orgid,
    },
  });

  revalidatePath("/organisation");
}
