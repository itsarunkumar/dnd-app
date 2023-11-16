"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";
import React from "react";
import { useSession } from "next-auth/react";

function SignIn() {
  const session = useSession();

  return (
    <div className=" flex flex-col justify-center items-center gap-y-4">
      <h1>Login to your account</h1>
      <Button
        variant="default"
        className="px-3 shadow-sm"
        onClick={() => signIn("google")}
      >
        Login using google
      </Button>

      <Button onClick={() => signOut()}>Logout</Button>

      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}

export default SignIn;
