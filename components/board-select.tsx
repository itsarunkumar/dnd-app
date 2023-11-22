"use client";

import * as React from "react";
import { Board } from "@prisma/client";

import { useRouter, useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import BoardCreate from "./board-create";

interface BoardSelectProps {
  boards: Board[];
}

export function BoardSelect({ boards }: BoardSelectProps) {
  const [open, setOpen] = React.useState(false);

  const router = useRouter();
  const params = useParams();

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">Board</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {/* {selectedStatus ? <>{selectedStatus.name}</> : <>+ Set status</>} */}
            {boards.find((board) => board.id === params.boardId)?.name ||
              "Select Board"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-56" side="bottom" align="center">
          <Command>
            <CommandInput placeholder="Change board..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                <CommandItem>
                  <BoardCreate />
                </CommandItem>
                {boards.map((board) => (
                  <CommandItem
                    className="cursor-pointer"
                    key={board.id}
                    value={board.id}
                    onSelect={(value) => {
                      router.push(`/board/${board.id}`);
                      router.refresh();
                      setOpen(false);
                    }}
                  >
                    {board.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
