import Link from "next/link";
import React from "react";
import { UserDropdown } from "./user-dropdown";
import { BoardSelect } from "./board-select";
import { allBoards } from "@/actions/board-actions/all-boards";

async function AppNavbar() {
  const boards = await allBoards();

  return (
    <nav className="flex items-center justify-between w-full py-4 px-2 md:px-6 border">
      <Link href={"/app"}>DnD</Link>
      <div className="flex items-center gap-2">
        <BoardSelect boards={boards} />
        <UserDropdown />
      </div>
    </nav>
  );
}

export default AppNavbar;
