import React from "react";
import OrgForm from "./org-form";
import Link from "next/link";

export function Sidebar({ orgs }: { orgs: any[] }) {
  return (
    <div className="w-80 h-full hidden md:flex flex-col items-center border">
      <div className="w-full flex justify-around items-center p-2">
        <span>Spaces</span>
        <OrgForm />
      </div>
      <div className="w-full flex flex-col gap-y-2">
        {orgs.map((org) => (
          <>
            <div className=" p-2 border rounded-md shadow-sm w-full mx-auto ">
              <Link href={`/organisation/${org.id}`}>{org.name}</Link>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
