"use client";

import Link from "next/link";
import { DashboardIcon } from "@radix-ui/react-icons";
import { signOut, useSession } from "next-auth/react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function UserDropdown() {
  const session = useSession();

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src={session?.data?.user?.image as string} alt="" />
          <AvatarFallback>{session?.data?.user?.name}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-44 space-y-2">
        <h1>{session.data?.user?.name}</h1>
        <Separator />
        <Link href={"/app"} className="flex items-center gap-2">
          <DashboardIcon /> Boards
        </Link>

        <Button
          onClick={() => signOut()}
          variant="ghost"
          className="w-full p-0"
        >
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
}
