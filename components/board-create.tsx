"use client";

import React, { ElementRef, useRef } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { createBoard } from "@/actions/board-actions/create-board";
import { SubmitButton } from "@/components/submit-button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";

import useServerFunction from "@/hooks/use-action";

export default function BoardCreate({ className }: { className?: string }) {
  const dref = useRef<ElementRef<"button">>(null);

  const { executeServerFunction } = useServerFunction(createBoard, {
    onSuccess: () => {
      dref.current?.click();
    },
  });

  async function onSubmit(data: FormData) {
    const boardId = data.get("board") as string;
    executeServerFunction(boardId);
  }

  return (
    <Dialog>
      <DialogTrigger
        className={cn("flex items-center gap-2 w-full", className)}
      >
        <Plus className="w-4 h-4" /> create board
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg my-2">Create your board</DialogTitle>
          <DialogDescription>
            <form
              action={onSubmit}
              className="flex flex-col gap-3 items-center w-full"
            >
              <Label htmlFor="board" className="self-start">
                Board Name
              </Label>
              <Input placeholder="Board Name" name="board" id="board" />
              <div className="w-full flex gap-3 flex-row-reverse">
                <SubmitButton className="w-full">Create</SubmitButton>
                <DialogClose ref={dref} asChild className="w-full">
                  <Button
                    variant="ghost"
                    className="flex items-center justify-center gap-1"
                  >
                    Close <Cross2Icon />
                  </Button>
                </DialogClose>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
