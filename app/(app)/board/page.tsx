import React from "react";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function BoardPage() {
  const session = await auth();

  const boards = await prisma.board.findMany({
    where: {
      user: {
        email: session?.user?.email,
      },
    },
  });

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h1 className="text-2xl my-4">Boards by {session?.user?.name}</h1>

      {boards.map((board) => (
        <div
          key={board.id}
          className="text-lg flex items-center gap-4 border rounded-sm bg-slate-200 px-4 py-2 shadow-sm my-2"
        >
          <h1>{board.name}</h1>
          <Button size="default" variant="secondary" asChild>
            <Link href={`/board/${board.id}`}>Open</Link>
          </Button>
        </div>
      ))}
    </div>
  );
}
