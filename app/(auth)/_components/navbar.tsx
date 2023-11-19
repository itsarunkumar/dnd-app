import Link from "next/link";

import { Logo } from "@/components/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { auth } from "@/lib/auth";

async function AuthNavbar() {
  const session = await auth();

  return (
    <nav className="w-full fixed top-0 py-4 px-2 md:px-6 flex items-center justify-between border ">
      <Logo />

      {session ? (
        <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
              <AvatarImage src="https://i.pravatar.cc/300" />
            </Avatar>
          </PopoverTrigger>
          <PopoverContent
            side="bottom"
            sideOffset={10}
            className="w-56 border shadow-sm"
          >
            <Link href="/app">Go to DND</Link>
          </PopoverContent>
        </Popover>
      ) : null}
    </nav>
  );
}

export default AuthNavbar;
