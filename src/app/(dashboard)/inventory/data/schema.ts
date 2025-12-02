// This file is deprecated and will be removed in a future update.
// Please use src/lib/schema.ts instead.
import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  etapa: z.string(),
  categoria: z.string(),
  size: z.string(),
  color: z.string(),
  colorName: z.string(),
  stock: z.number(),
  imageUrl: z.string().optional(),
});

export type Task = z.infer<typeof taskSchema>;
