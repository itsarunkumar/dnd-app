import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Trash2 } from "lucide-react";
import { Table } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { deleteTable } from "@/actions/table-action";

interface TableOptionsProps {
  table: Table;
}

export function ListOptions({ table }: TableOptionsProps) {
  async function deleteList() {
    await deleteTable.bind(null, table.id)();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <DotsVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="capitalize">
          {table.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          History
        </DropdownMenuItem>

        <DropdownMenuItem>
          <form action={deleteList}>
            <input
              type="text"
              name="tableId"
              id="tableId"
              value={table.id}
              hidden
              readOnly
            />
            <Button
              variant="ghost"
              className="flex items-center justify-start gap-2"
            >
              <Trash2 className="w-4 h-4 text-rose-500" />
              Delete
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
