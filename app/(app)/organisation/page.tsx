import React from "react";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

import OrgForm, { DeleteOrgForm } from "../_components/org-form";

async function Organisation() {
  const session = await auth();

  const userorgs = await prisma.user.findUnique({
    where: { email: session?.user?.email as string },
    include: { OwnedOrganisations: true },
  });

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="flex py-4 items-center justify-around">
        <h1 className="text-xl hidden md:block">
          Orgs by
          <span className="font-bold ml-2">{session?.user?.name} </span>
        </h1>

        <OrgForm />
      </div>

      <div className="flex flex-col items-center gap-y-5">
        {userorgs?.OwnedOrganisations.map((org) => (
          <div
            className="w-80 p-4 rounded-md border shadow-md flex items-center justify-between gap-x-4"
            key={org.id}
          >
            {org.name}
            <DeleteOrgForm id={org.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Organisation;
