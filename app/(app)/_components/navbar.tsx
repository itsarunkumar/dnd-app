import Link from "next/link";
import React from "react";
import { UserDropdown } from "./user-dropdown";

function AppNavbar() {
  return (
    <nav className="flex items-center justify-between w-full py-4 px-2 md:px-6 border">
      <Link href={"/app"}>dnd</Link>
      <UserDropdown />
    </nav>
  );
}

export default AppNavbar;
