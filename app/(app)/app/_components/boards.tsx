import { ChevronRightIcon, Trash2 } from "lucide-react";
import React from "react";
import Link from "next/link";

import { deleteBoard } from "@/actions/board-actions/delete-board";
import { allBoards } from "@/actions/board-actions/all-boards";

import { Button } from "@/components/ui/button";

import BoardCreate from "../../_components/board-create";
import { LayersIcon } from "@radix-ui/react-icons";

export async function Boards() {
  const boards = await allBoards();

  return (
    <div className="flex flex-col items-center gap-2 px-4 w-full md:w-[400px] min-h-[500px] border rounded-md shadow-md ">
      <div className=" w-full px-3 py-2 flex items-center justify-between gap-3">
        <h1 className="text-base capitalize flex items-center gap-2 ">
          All Boards <LayersIcon />
        </h1>
        <BoardCreate className="w-44 bg-slate-300 p-2 rounded-md" />
      </div>
      {boards.map((board) => (
        <div
          key={board.id}
          className="w-full bg-slate-100 px-3 py-2 border border-slate-600 border-opacity-20 shadow-sm rounded-md flex items-center justify-between gap-3"
        >
          <Link href={`/board/${board.id}`} className="w-full">
            {board.name}
          </Link>

          <form action={deleteBoard}>
            <input
              type="text"
              name="boardId"
              id="boardId"
              value={board.id}
              hidden
              readOnly
            />
            <Button size="icon" variant="ghost">
              <Trash2 className="w-4 h-4 text-rose-500" />
            </Button>
          </form>
        </div>
      ))}
    </div>
  );
}
