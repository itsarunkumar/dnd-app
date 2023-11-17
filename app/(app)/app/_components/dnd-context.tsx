"use client";

import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
  useSensor,
  MouseSensor,
  TouchSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  restrictToWindowEdges,
  restrictToFirstScrollableAncestor,
} from "@dnd-kit/modifiers";

import { Droppable } from "./droppable";
import { Draggable } from "./draggable";

import { Card } from "@prisma/client";
import { FormCard, TableForm } from "./form";
import { updateCard } from "@/actions/table-action";

import { CardItem } from "./card-item";

// correctly type the props
type DNDProps = {
  containers: {
    id: string;
    name: string;
    userId: string;
    cards: Card[];
  }[];
};

export default function DND({ containers }: DNDProps) {
  const [containersState, setContainersState] = useState([...containers]);
  const [active, setActive] = useState(null);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
      delay: 300,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    setContainersState([...containers]);
  }, [containers]);

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      collisionDetection={closestCenter}
      modifiers={[restrictToFirstScrollableAncestor]}
    >
      {containersState.map((container) => (
        <Droppable
          key={container.id}
          id={container.id}
          className="w-[272px] h-full space-y-3 bg-slate-100 px-5 py-3 rounded-md shrink-0 select-none"
        >
          {/* Content inside Droppable */}
          <div className="capitalize w-full p-2 border rounded-md shadow-sm flex items-center justify-between bg-slate-800 text-slate-50 mb-2">
            {container.name}
            <FormCard
              table={container.id}
              key={container.id}
              className="px-4"
            />
          </div>

          {container.cards?.map((card) => (
            <>
              <Draggable
                key={card.id}
                id={card.id}
                className="bg-slate-100 w-full px-4 py-2 text-slate-900 border border-slate-600 border-opacity-20 shadow-md rounded-md my-1"
              >
                <CardItem card={card} />
              </Draggable>
            </>
          ))}

          <FormCard
            table={container.id}
            className="w-full px-4 py-2 flex items-center justify-center border border-slate-900 border-opacity-20 bg-slate-200 text-slate-900 rounded-md my-1"
          />

          {/* End of Droppable content */}
        </Droppable>
      ))}

      {/* overlay for draggable */}
      <DragOverlay
        modifiers={[restrictToWindowEdges]}
        className="bg-slate-800 w-fit px-4 py-2 text-slate-50 rounded-md my-1"
      >
        {active}
      </DragOverlay>

      {/* to add a new table or list */}
      <TableForm />
    </DndContext>
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { over } = event;

    if (event.active.id && over?.id && event.active.id !== over.id) {
      setContainersState((prevContainers) => {
        // Create a copy of the state
        const updatedContainers = [...prevContainers];

        let moveCard;

        // Iterate through the previous containers
        for (const container of updatedContainers) {
          // Find the card in the previous container
          const cardIndex = container.cards.findIndex(
            (item) => item.id === event.active.id
          );

          // If the card is found in the previous container
          if (cardIndex !== -1) {
            // Get the card and remove it from the previous container
            moveCard = container.cards[cardIndex];
            container.cards.splice(cardIndex, 1);
            break; // Exit the loop since we found and processed the card
          }
        }

        // Find the new container
        const targetContainer = updatedContainers.find(
          (container) => container.id === over.id
        );

        // Update the new container with the card (if found)
        if (targetContainer && moveCard) {
          targetContainer.cards = [...targetContainer.cards, moveCard];
        }

        // Update the state with the new container arrangement
        return updatedContainers;
      });

      // Perform any necessary API calls or updates here
      await updateCard(event.active.id as string, over.id as string);
    }

    setActive(null);
  }

  function handleDragStart(event: DragStartEvent) {
    let data;

    for (let cont of containersState) {
      for (let cc of cont.cards) {
        if (cc.id === event.active.id) {
          data = cc;
          break;
        }
      }
    }

    // @ts-ignore
    setActive(data.name);
  }
}
