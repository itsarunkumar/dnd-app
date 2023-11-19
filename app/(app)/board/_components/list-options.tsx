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
import useServerFunction from "@/hooks/use-action";
import { SubmitButton } from "@/components/submit-button";

interface TableOptionsProps {
  table: Table;
}

export function ListOptions({ table }: TableOptionsProps) {
  const { executeServerFunction } = useServerFunction(
    deleteTable.bind(null, table.id),
    {
      onSuccess: (data) => {
        console.log(data, "sucess in delete");
      },
    }
  );

  async function deleteList() {
    executeServerFunction();
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
            <SubmitButton
              variant="ghost"
              className="flex items-center justify-start gap-2"
            >
              <Trash2 className="w-4 h-4 text-rose-500" />
              Delete
            </SubmitButton>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
