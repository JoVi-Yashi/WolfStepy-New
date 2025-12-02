import { InventoryClient } from "./components/inventory-client";

export default async function InventoryPage() {

  return (
    <div className="flex flex-col gap-6">
       <div className="space-y-1">
            <h1 className="text-3xl font-semibold">Gestión de Inventario</h1>
            <p className="text-muted-foreground">
                Visualiza, gestiona y haz seguimiento de todos tus productos de calzado.
            </p>
        </div>
      <InventoryClient />
    </div>
  );
}
