import { z } from "zod";

// Schema for a Product in the inventory
export const productSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string().min(1, "El nombre es requerido."),
  description: z.string().optional(),
  etapa: z.string().min(1, "La etapa es requerida."),
  categoria: z.string().min(1, "La categoría es requerida."),
  size: z.string().min(1, "La talla es requerida."),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Debe ser un código hexadecimal de color."),
  colorName: z.string().min(1, "El nombre del color es requerido."),
  stock: z.number().min(0, "El stock no puede ser negativo."),
  imageUrl: z.string().url("Debe ser una URL válida.").optional().or(z.literal('')),
});

export type Product = z.infer<typeof productSchema>;

// Schema for a Product Category
export const categorySchema = z.object({
    id: z.string(),
    userId: z.string(),
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.'),
    description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres.'),
    attributes: z.array(z.string()).min(1, 'Debe haber al menos un atributo.'),
    productCount: z.number().optional(),
});

export type Category = z.infer<typeof categorySchema>;
