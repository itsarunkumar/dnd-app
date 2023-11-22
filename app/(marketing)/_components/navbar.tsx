import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserDropdown from "@/components/user-dropdown";

export const Navbar = async () => {
  const session = await auth();

  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <>
            {session?.user ? (
              <UserDropdown />
            ) : (
              <Button variant="outline" asChild>
                <Link href="/sign-in">Login</Link>
              </Button>
            )}
          </>
        </div>
      </div>
    </div>
  );
};
