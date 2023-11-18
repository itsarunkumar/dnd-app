"use client";

import { Plus, X } from "lucide-react";
import { useState, useRef, ElementRef } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { createCard, createTable } from "@/actions/table-action";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import useServerFunction from "@/hooks/use-action";
import { object } from "zod";

export function TableForm({ boardId }: { boardId: string }) {
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  function enableEditing() {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  }

  function disableEditing() {
    setIsEditing(false);
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      disableEditing();
    }
  }

  function onSubmit(data: FormData) {
    createTable(data);
    disableEditing();
  }

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex gap-2 shrink-0 w-72 h-fit bg-slate-100 p-2 rounded-md border"
      >
        <input
          type="text"
          name="boardId"
          id="boardId"
          value={boardId}
          hidden
          readOnly
          className=""
        />
        <Input
          type="text"
          ref={inputRef}
          placeholder="Name"
          name="table"
          id="table"
          className="rounded"
        />
        <SubmitButton
          variant="ghost"
          type="submit"
          className="flex items-center"
        >
          <Plus className="w-4 h-4" />
          Add
        </SubmitButton>
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditing}
      className="shrink-0 w-72 p-5 flex justify-start items-center"
    >
      <div>Add List</div>
    </Button>
  );
}

export function FormCard({
  table,
  className,
}: {
  table: string;
  className?: string;
}) {
  const btnRef = useRef<ElementRef<"button">>(null);

  const { executeServerFunction } = useServerFunction(createCard, {
    onSuccess: () => {
      btnRef.current?.click();
    },
  });

  function onSubmit(data: FormData) {
    const { card, description, tableId } = Object.fromEntries(data);

    console.log(card, description, tableId);

    executeServerFunction({
      name: card,
      description,
      tableId,
    });
  }

  return (
    <Popover>
      <PopoverTrigger className={cn("shrink-0", className)}>
        <Plus className="w-4 h-4" />
      </PopoverTrigger>

      <PopoverContent className="w-80 relative p-4">
        <PopoverClose asChild className="absolute top-2 right-2">
          <Button ref={btnRef} size="icon" variant="ghost">
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <div>
          <h1 className="text-lg font-bold">Add a card</h1>
          <form action={onSubmit} className="flex flex-col gap-2 ">
            <Label htmlFor="card">Name</Label>
            <Input
              type="text"
              placeholder="Name"
              name="card"
              id="card"
              required
            />
            <Label htmlFor="description">Description</Label>
            <Textarea
              placeholder="Description"
              name="description"
              id="description"
            />

            <input
              type="text"
              name="tableId"
              id="tableId"
              value={table}
              hidden
              readOnly
            />
            <SubmitButton>Create</SubmitButton>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
