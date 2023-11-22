import React from "react";
import Link from "next/link";

import { Logo } from "./logo";
import { auth } from "@/lib/auth";
import UserDropdown from "./user-dropdown";
import UserSignIn from "./user-signin";
import { BoardSelect } from "./board-select";
import { prisma } from "@/lib/prisma";

export async function Navbar() {
  const session = await auth();

  const boards = await prisma.board.findMany({
    where: {
      user: {
        email: session?.user?.email,
      },
    },
  });

  return (
    <nav className="flex items-center justify-between w-full py-4 px-2 md:px-6 border">
      <Link href={"/"}>
        <Logo />
      </Link>

      <div className="flex items-center gap-3">
        {session ? (
          <>
            <BoardSelect boards={boards} />
            <UserDropdown session={session} />{" "}
          </>
        ) : (
          <UserSignIn />
        )}
      </div>
    </nav>
  );
}
