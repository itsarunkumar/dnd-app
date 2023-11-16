import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (session) {
    return redirect("/organisation");
  }

  return (
    <div className="h-full flex justify-center items-center">{children}</div>
  );
}

export default AuthLayout;
