import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { DashboardIcon } from "@radix-ui/react-icons";
import { auth } from "@/lib/auth";

export async function UserDropdown() {
  const session = await auth();

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src={session?.user?.image as string} alt="" />
          <AvatarFallback>{session?.user?.name}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-44">
        <Link href={"/app"} className="flex items-center gap-2">
          <DashboardIcon /> Boards
        </Link>
      </PopoverContent>
    </Popover>
  );
}
