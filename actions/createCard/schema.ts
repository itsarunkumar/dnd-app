import { z } from "zod";

export const createTable = z.object({
  table: z.string().min(3, {
    message: "Title is too short.",
  }),
});
