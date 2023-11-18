"use client";

import Modal from "@/components/modal";
import { Card } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { FileEdit } from "lucide-react";

import { updateCardData } from "@/actions/table-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { SubmitButton } from "@/components/submit-button";

interface CardItemProps {
  card: Card;
}

export function CardItem({ card }: CardItemProps) {
  const [showModal, setShowModal] = React.useState(false);
  const [isEditing, setIsEditing] = useState(false);

  function onSubmit(data: FormData) {
    updateCardData(data);
    setIsEditing(false);
  }

  return (
    <div>
      <div className="w-full" role="button" onClick={() => setShowModal(true)}>
        {card.name}
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        className="w-96 h-[270px] shadow-sm border p-4  "
      >
        <Toggle onClick={() => setIsEditing(!isEditing)}>
          <FileEdit className="w-4 h-4" />
        </Toggle>

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
          <div className="w-full h-full flex flex-col gap-3">
            <h1 className="text-lg">{card.name}</h1>
            <p className="">{card.description}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
