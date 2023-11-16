"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useLocalStorage } from "usehooks-ts";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function OrganisationSelector({ orgs }: { orgs: any[] }) {
  const [localOrg, setLocalOrg] = useLocalStorage<Record<string, string>>(
    "s-org",
    {}
  );

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {localOrg.org || "Select Organisation"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Select Organisation" className="h-9" />
          <CommandEmpty>No organisation found.</CommandEmpty>
          <CommandGroup>
            {orgs.map((org) => (
              <CommandItem
                key={org.id}
                value={org.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);

                  setLocalOrg({
                    org: currentValue,
                    id: org.id,
                  });
                  setOpen(false);
                }}
              >
                {org.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === org.name ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
