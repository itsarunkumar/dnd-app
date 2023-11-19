"use client";

import { Card } from "@prisma/client";
import React, { useEffect, useRef, useState } from "react";
import { FileEdit } from "lucide-react";

import Modal from "@/components/modal";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { updateCardData } from "@/actions/table-action";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { SubmitButton } from "@/components/submit-button";
import useServerFunction from "@/hooks/use-action";

import { deleteCard } from "@/actions/card-actions/delete-card";

interface CardItemProps {
  card: Card;
  tableId: string;
}

export function CardItem({ card, tableId }: CardItemProps) {
  const [showModal, setShowModal] = React.useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { executeServerFunction } = useServerFunction(deleteCard, {
    onSuccess: (data) => {
      console.log(data, "sucess in delete");
    },
  });

  async function deletesingleCard() {
    executeServerFunction({
      cardId: card.id,
      tableId,
    });
  }

  function onSubmit(data: FormData) {
    updateCardData(data);
    setIsEditing(false);
  }

  return (
    <Dialog>
      <DialogTrigger className="w-full">{card.name}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{card.name}</DialogTitle>
          <DialogDescription>
            <div className="relative  h-full w-full">
              {isEditing ? (
                <form
                  action={onSubmit}
                  className="w-full h-full flex flex-col gap-3 relative"
                >
                  <input
                    type="text"
                    name="cardId"
                    id="cardId"
                    value={card.id}
                    hidden
                    readOnly
                  />
                  <Label htmlFor="card">Name</Label>
                  <Input
                    defaultValue={card.name}
                    name="card"
                    placeholder="card"
                    id="card"
                  />
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    defaultValue={card.description as string}
                    name="description"
                    placeholder="description"
                    id="description"
                  />

                  <SubmitButton type="submit">save</SubmitButton>
                </form>
              ) : (
                <div className="w-full h-full flex flex-col justify-between gap-3 ">
                  {/* <h1 className="text-xl capitalize font-semibold">
                    {card.name}
                  </h1> */}
                  <div className="h-full text-slate-600">
                    <p>{card.description}</p>
                  </div>

                  <form
                    action={deletesingleCard}
                    className="w-full flex items-center gap-2  "
                  >
                    <SubmitButton className="w-full">Delete</SubmitButton>
                    <Toggle
                      className=""
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <FileEdit className="w-4 h-4" />
                    </Toggle>
                  </form>
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
