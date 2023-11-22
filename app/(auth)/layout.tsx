import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="h-full flex flex-col justify-center items-center">
      {children}
    </div>
  );
}

export default AuthLayout;
