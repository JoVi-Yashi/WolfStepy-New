'use client';

import * as React from 'react';
import { getColumns } from './columns';
import { DataTable } from './data-table';
import { useCollection, useFirestore, useUser, useMemoFirebase, addDocumentNonBlocking, setDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase';
import { type Product, type Category } from '@/lib/schema';
import { collection, doc, writeBatch } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { categories as seedCategories, products as seedProducts } from '../data/seed-data';
import { useToast } from '@/hooks/use-toast';

export function InventoryClient() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSeeding, setIsSeeding] = React.useState(false);

  const productsCollectionRef = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return collection(firestore, `users/${user.uid}/products`);
  }, [firestore, user?.uid]);

  const categoriesCollectionRef = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return collection(firestore, `users/${user.uid}/categories`);
  }, [firestore, user?.uid]);

  const { data: products, isLoading: areProductsLoading } = useCollection<Product>(productsCollectionRef);
  const { data: categories, isLoading: areCategoriesLoading } = useCollection<Category>(categoriesCollectionRef);
  
  const handleAddProduct = (newProductData: Omit<Product, 'id' | 'userId'>) => {
    if (!productsCollectionRef || !user?.uid) return;
    const productWithUser = { ...newProductData, userId: user.uid };
    addDocumentNonBlocking(productsCollectionRef, productWithUser);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    if (!firestore || !user?.uid) return;
    const docRef = doc(firestore, `users/${user.uid}/products`, updatedProduct.id);
    setDocumentNonBlocking(docRef, updatedProduct, { merge: true });
  };

  const handleDeleteProduct = (productId: string) => {
    if (!firestore || !user?.uid) return;
    const docRef = doc(firestore, `users/${user.uid}/products`, productId);
    deleteDocumentNonBlocking(docRef);
  };
  
  const columns = React.useMemo(() => getColumns(handleDeleteProduct), [handleDeleteProduct]);

  const handleSeedData = async () => {
    if (!firestore || !user) return;
    setIsSeeding(true);

    try {
        const batch = writeBatch(firestore);

        // Seed Categories
        seedCategories.forEach(category => {
            const newDocRef = doc(categoriesCollectionRef!);
            const categoryData: Omit<Category, 'id'> = {
                userId: user.uid,
                name: category.name,
                description: category.description,
                attributes: category.attributes,
                productCount: 0, // Will be calculated or can be omitted
            };
            batch.set(newDocRef, categoryData);
        });

        // Seed Products
        seedProducts.forEach(product => {
            const newDocRef = doc(productsCollectionRef!);
            const productData: Omit<Product, 'id'> = {
                userId: user.uid,
                title: product.title,
                etapa: product.etapa,
                categoria: product.categoria,
                size: product.size,
                color: product.color,
                colorName: product.colorName,
                stock: product.stock,
                imageUrl: product.imageUrl || '',
            };
            batch.set(newDocRef, productData);
        });
        
        await batch.commit();

        toast({
            title: "Datos de ejemplo cargados",
            description: "Tu inventario ha sido poblado con productos y categorías."
        })

    } catch (error) {
        console.error("Error seeding data:", error);
        toast({
            variant: "destructive",
            title: "Error al cargar datos",
            description: "No se pudieron cargar los datos de ejemplo. Inténtalo de nuevo."
        })
    } finally {
        setIsSeeding(false);
    }
  }


  if (isUserLoading || areProductsLoading || areCategoriesLoading) {
    return (
        <div className="flex flex-col gap-6">
           <div className="space-y-1">
                <h1 className="text-3xl font-semibold">Gestión de Inventario</h1>
                <p className="text-muted-foreground">
                    Visualiza, gestiona y haz seguimiento de todos tus productos de calzado.
                </p>
            </div>
            <div className="flex items-center justify-between py-4">
                <Skeleton className="h-10 w-full sm:w-[250px]" />
                <Skeleton className="h-10 w-full sm:w-[150px]" />
            </div>
            <div className="rounded-md border">
                <div className="w-full p-4 border-b">
                    <Skeleton className="h-8 w-full" />
                </div>
                <div className="w-full p-4 space-y-4">
                    {[...new Array(5)].map((_, i) => (
                         <div key={i} className="flex items-center gap-4">
                            <Skeleton className="h-16 w-16" />
                            <Skeleton className="h-6 flex-1" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
  }

  // If there are no products and no categories, show the seed button
  if ((!products || products.length === 0) && (!categories || categories.length === 0)) {
    return (
        <div className="flex flex-col gap-6 items-center justify-center text-center h-96">
            <div className="space-y-1">
                <h1 className="text-3xl font-semibold">Tu Inventario está Vacío</h1>
                <p className="text-muted-foreground">
                    Comienza por añadir tu primer producto o carga un conjunto de datos de ejemplo para empezar.
                </p>
            </div>
            <Button onClick={handleSeedData} disabled={isSeeding}>
                {isSeeding ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Cargando...
                    </>
                ) : (
                    "Cargar Datos de Ejemplo"
                )}
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
                Esto poblará tu inventario con categorías y productos de muestra.
            </p>
        </div>
    )
  }

  return (
    <DataTable
        columns={columns}
        data={products || []}
        categories={categories || []}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
    />
  );
}
