// This file is deprecated and will be removed in a future update.
// Please use src/lib/schema.ts instead.
import { z } from "zod";

// This data is now located in src/app/(dashboard)/inventory/data/seed-data.ts
// and is loaded into Firestore via the "Cargar Datos de Ejemplo" button
// in the InventoryClient component.

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

export const tasks: Task[] = []
