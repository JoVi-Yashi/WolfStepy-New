
"use client";

import * as React from "react";
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PlusCircle } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductForm } from "./product-form";
import { type Product, type Category } from "@/lib/schema";


interface DataTableProps<TData extends Product, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  categories: Category[];
  onAddProduct: (product: Omit<Product, 'id' | 'userId'>) => void;
  onUpdateProduct: (product: Product) => void;
}

export function DataTable<TData extends Product, TValue>({
  columns,
  data,
  categories,
  onAddProduct,
  onUpdateProduct,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<Product | undefined>(undefined);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    meta: {
        editRow: (product: Product) => {
            setEditingProduct(product);
            setIsFormOpen(true);
        }
    }
  });

  React.useEffect(() => {
    // When the dialog closes, reset the editing product
    if(!isFormOpen) {
        setEditingProduct(undefined);
    }
  }, [isFormOpen]);

  const handleOpenAddDialog = () => {
    setEditingProduct(undefined);
    setIsFormOpen(true);
  }


  const handleSaveProduct = (productData: Omit<Product, 'id' | 'userId'>) => {
    if (editingProduct) {
        onUpdateProduct({ ...editingProduct, ...productData });
    } else {
        onAddProduct(productData);
    }
    setIsFormOpen(false);
  };


  return (
    <div>
        <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-2">
            <Input
            placeholder="Filtrar por nombre o ID..."
            value={globalFilter ?? ''}
            onChange={(event) =>
                setGlobalFilter(event.target.value)
            }
            className="w-full sm:max-w-sm"
            />
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger asChild>
                    <Button onClick={handleOpenAddDialog} className="w-full sm:w-auto">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Añadir Producto
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>{editingProduct ? 'Editar Producto' : 'Añadir Nuevo Producto'}</DialogTitle>
                    <DialogDescription>
                        {editingProduct ? 'Realiza cambios en tu producto aquí.' : 'Rellena los detalles para añadir un nuevo producto.'}
                    </DialogDescription>
                    </DialogHeader>
                    <ProductForm 
                        product={editingProduct} 
                        onSave={handleSaveProduct} 
                        onDone={() => setIsFormOpen(false)} 
                        categories={categories} 
                    />
                </DialogContent>
            </Dialog>
      </div>
      <div className="rounded-md border bg-card">
        <div className='w-full overflow-x-auto'>
            <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                    return (
                        <TableHead key={header.id}>
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </TableHead>
    );
                    })}
                </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                    <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    >
                    {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                        {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                        )}
                        </TableCell>
                    ))}
                    </TableRow>
                ))
                ) : (
                <TableRow>
                    <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                    >
                    No hay resultados.
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
