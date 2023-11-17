import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AuthNavbar from "./_components/navbar";

async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <AuthNavbar />
      {children}
    </div>
  );
}

export default AuthLayout;
