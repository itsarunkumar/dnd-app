import React from "react";
import { Sidebar } from "../_components/sidebar";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function OrganisationLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  const orgs = await prisma.organisation.findMany({
    where: { owner: { email: session?.user?.email as string } },
  });

  return (
    <div className="flex items-center h-full">
      <Sidebar orgs={orgs} />
      {children}
    </div>
  );
}

export default OrganisationLayout;
