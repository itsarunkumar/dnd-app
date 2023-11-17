"use client";

import Modal from "@/components/modal";
import { Card } from "@prisma/client";
import React, { useState } from "react";
import { useEditInput } from "./edit-input";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CardItemProps {
  card: Card;
}

export function CardItem({ card }: CardItemProps) {
  const [showModal, setShowModal] = React.useState(false);

  const [EditInputComponent, { enableEditing, disableEditing }] =
    useEditInput();

  return (
    <div>
      <div className="w-full" role="button" onClick={() => setShowModal(true)}>
        {card.name}
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        className="w-96 min-h-[200px] shadow-sm border p-4 rounded-sm"
      >
        <div className="w-full h-full">
          <EditInputComponent
            key={card.id}
            buttonProps={{
              text: card.name,
              variant: "ghost",
              className: "w-full flex items-center justify-start",
            }}
            inputProps={{ placeholder: card.name, value: card.name }}
          />
          <p>{card.description}</p>
        </div>
      </Modal>
    </div>
  );
}
