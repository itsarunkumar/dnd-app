import React from "react";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deleteBoard } from "@/actions/board-actions/delete-board";
import { SubmitButton } from "@/components/submit-button";
import { Trash2 } from "lucide-react";

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
          className=" w-80 text-lg flex justify-between items-center gap-4 border rounded-sm bg-slate-200 px-4 py-2 shadow-sm my-2"
        >
          <h1 className="">{board.name}</h1>
          <Button size="default" variant="secondary" className="" asChild>
            <Link href={`/board/${board.id}`}>Open</Link>
          </Button>
          <form action={deleteBoard} className="">
            <input
              type="text"
              name="boardId"
              id="boardId"
              value={board.id}
              hidden
              readOnly
            />
            <SubmitButton
              type="submit"
              variant="destructive"
              size="icon"
              className="p-0"
            >
              <Trash2 className="w-4 h-4" />
            </SubmitButton>
          </form>
        </div>
      ))}
    </div>
  );
}
