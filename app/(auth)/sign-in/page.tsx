"use client";

import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

function SignIn() {
  const session = useSession();

  return (
    <div className=" flex flex-col justify-center items-center gap-y-4">
      {session.status === "unauthenticated" ? (
        <>
          <h1>Login to your account</h1>
          <Button
            variant="default"
            className="px-3 shadow-sm"
            onClick={() => signIn("google")}
          >
            Login using google
          </Button>
        </>
      ) : (
        <>
          <Image
            width={100}
            height={100}
            src={session.data?.user?.image as string}
            alt=""
            className="rounded-full w-16 h-16"
          />
          <Button onClick={() => signOut()}>Logout</Button>
        </>
      )}

      <div>
        <h1>{session.data?.user?.name}</h1>
        <span>{session.data?.user?.email}</span>
      </div>
    </div>
  );
}

export default SignIn;
