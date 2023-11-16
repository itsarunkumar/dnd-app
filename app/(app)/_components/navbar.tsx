import { Logo } from "@/components/logo";
import React from "react";
import { UserDropdown } from "./user-dropdown";
import { auth } from "@/lib/auth";
import { OrganisationSelector } from "./org-dropdown";
import { prisma } from "@/lib/prisma";

async function Navbar() {
  const session = await auth();
  const orgs = await prisma.organisation.findMany({
    where: { owner: { email: session?.user?.email as string } },
  });

  return (
    <div className="py-4 px-2 md:px-5 border-b shadow-sm flex justify-between items-center ">
      <div>
        <Logo />
      </div>
      <div className="flex items-center gap-x-4">
        {/* org selector */}
        <OrganisationSelector orgs={orgs} />
        {/* profile */}
        <UserDropdown session={session} />
      </div>
    </div>
  );
}

export default Navbar;
