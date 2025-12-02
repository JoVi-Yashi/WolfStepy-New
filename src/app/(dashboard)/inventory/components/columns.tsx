
"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { type Product } from "@/lib/schema";


const getImage = (product: Product) => {
    if (product.imageUrl) {
        return {
            imageUrl: product.imageUrl,
            imageHint: 'custom image'
        }
    }
    return PlaceHolderImages.find(img => img.id === product.id) || PlaceHolderImages.find(i => i.id === 'default')!;
}

// The onEdit function will be passed via table.options.meta
type TableMeta = {
    editRow: (product: Product) => void;
    deleteRow: (productId: string) => void;
}

export const getColumns = (onDelete: (productId: string) => void): ColumnDef<Product>[] => [
  {
    accessorKey: "imageUrl",
    header: "Imagen",
    cell: ({ row }) => {
        const image = getImage(row.original);
        return <div className="w-16 h-16 relative rounded-md overflow-hidden border">
            <Image src={image.imageUrl} alt={row.getValue("title")} fill style={{objectFit: "cover"}} data-ai-hint={image.imageHint}/>
        </div>
    },
    enableSorting: false,
    enableGlobalFilter: false,
  },
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div className="text-xs text-muted-foreground truncate w-24">{(row.getValue('id') as string)}</div>,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre del Producto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "categoria",
    header: "Categoría",
    cell: ({ row }) => <Badge variant="outline">{row.getValue("categoria")}</Badge>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "etapa",
    header: "Etapa",
    cell: ({ row }) => <Badge variant="secondary">{row.getValue("etapa")}</Badge>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "size",
    header: "Talla",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => {
        const color: string = row.getValue("color");
        const colorName: string = row.original.colorName;
        return <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: color }} aria-hidden="true"></div>
            <span className="sr-only">Color {colorName}</span>
            <span>{colorName}</span>
        </div>
    },
    enableGlobalFilter: false,
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Stock
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    cell: ({ row }) => {
        const stock: number = row.getValue("stock");
        const variant = stock < 10 ? 'destructive' : stock < 50 ? 'outline' : 'default';
        const stockColorClass = stock < 10 ? 'text-destructive' : 'text-muted-foreground';

        return <div className={`font-medium ${stockColorClass}`}>
            <Badge variant={variant}>{stock}</Badge>
        </div>
    },
    enableGlobalFilter: false,
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const product = row.original;
      const meta = table.options.meta as TableMeta;

      return (
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Abrir menú de acciones">
                <span className="sr-only">Abrir menú</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(product.id)}
              >
                Copiar ID del producto
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => meta.editRow(product)}>
                Editar Producto
              </DropdownMenuItem>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                  Eliminar Producto
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Esto eliminará permanentemente este
                producto de nuestros servidores.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive hover:bg-destructive/90"
                onClick={() => onDelete(product.id)}
              >
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
    enableGlobalFilter: false,
  },
];
