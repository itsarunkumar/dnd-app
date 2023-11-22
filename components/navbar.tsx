import React from "react";
import Link from "next/link";

import { Logo } from "./logo";
import { auth } from "@/lib/auth";
import UserDropdown from "./user-dropdown";
import UserSignIn from "./user-signin";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex items-center justify-between w-full py-4 px-2 md:px-6 border">
      <Link href={"/"}>
        <Logo />
      </Link>

      <div>{session ? <UserDropdown session={session} /> : <UserSignIn />}</div>
    </nav>
  );
}
