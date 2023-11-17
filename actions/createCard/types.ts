import { z } from "zod";

import { Table } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { createTable } from "./schema";

export type InputType = z.infer<typeof createTable>;
export type ReturnType = ActionState<InputType, Table>;
