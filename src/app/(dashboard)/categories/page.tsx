'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { Tag, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { CategoryForm } from './components/category-form';
import { useCollection, useFirestore, useUser, addDocumentNonBlocking, setDocumentNonBlocking, deleteDocumentNonBlocking, useMemoFirebase } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { type Category } from '@/lib/schema';
import { Skeleton } from '@/components/ui/skeleton';

export default function CategoriesPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const categoriesCollectionRef = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return collection(firestore, `users/${user.uid}/categories`);
  }, [firestore, user?.uid]);

  const { data: categories, isLoading: areCategoriesLoading } = useCollection<Category>(categoriesCollectionRef);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [editingCategory, setEditingCategory] = React.useState<Category | undefined>(undefined);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);

  const handleAddCategory = (newCategoryData: Omit<Category, 'id'| 'userId' | 'productCount'>) => {
    if (!categoriesCollectionRef) return;
    const categoryWithMetadata = {
        ...newCategoryData,
        userId: user!.uid,
        productCount: 0,
    }
    addDocumentNonBlocking(categoriesCollectionRef, categoryWithMetadata);
    setIsAddDialogOpen(false);
  };
  
  const handleEditCategory = (updatedCategoryData: Omit<Category, 'id'| 'userId' | 'productCount'>) => {
    if (!firestore || !user?.uid || !editingCategory) return;
    const docRef = doc(firestore, `users/${user.uid}/categories`, editingCategory.id);
    const categoryWithMetadata = {
        ...editingCategory,
        ...updatedCategoryData,
    }
    setDocumentNonBlocking(docRef, categoryWithMetadata, { merge: true });
    setIsEditDialogOpen(false);
    setEditingCategory(undefined);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (!firestore || !user?.uid) return;
    const docRef = doc(firestore, `users/${user.uid}/categories`, categoryId);
    deleteDocumentNonBlocking(docRef);
  }

  const openEditDialog = (category: Category) => {
    setEditingCategory(category);
    setIsEditDialogOpen(true);
  }

  const renderSkeleton = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
            <Card key={i}>
                <CardHeader>
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-48 mt-2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-6 w-14 rounded-full" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Skeleton className="h-4 w-36" />
                </CardFooter>
            </Card>
        ))}
    </div>
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold">
            Categorías de Productos
          </h1>
          <p className="text-muted-foreground">
            Gestiona tus categorías de calzado y sus atributos únicos.
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Añadir Categoría
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Añadir Nueva Categoría</DialogTitle>
              <DialogDescription>
                Rellena los detalles para crear una nueva categoría de producto.
              </DialogDescription>
            </DialogHeader>
            <CategoryForm
              onSave={handleAddCategory}
              onDone={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {areCategoriesLoading || isUserLoading ? renderSkeleton() : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories && categories.map((category) => (
            <Card key={category.id} className="flex flex-col">
                <CardHeader>
                <div className='flex justify-between items-start'>
                    <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-primary" />
                    {category.name}
                    </CardTitle>
                    <div className='flex items-center gap-1'>
                        <Button variant="ghost" size="icon" className='h-8 w-8' onClick={() => openEditDialog(category)}>
                            <Edit className='h-4 w-4' />
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className='h-8 w-8 text-destructive hover:text-destructive'>
                                    <Trash2 className='h-4 w-4' />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>¿Estás seguro de que quieres eliminar esta categoría?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Esta acción no se puede deshacer. Esto eliminará permanentemente la categoría. Los productos asociados no se eliminarán.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteCategory(category.id)} className="bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
                <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                <h4 className="mb-2 text-sm font-semibold">Atributos:</h4>
                <div className="flex flex-wrap gap-2">
                    {category.attributes.map((attr) => (
                    <span
                        key={attr}
                        className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                    >
                        {attr}
                    </span>
                    ))}
                </div>
                </CardContent>
                <CardFooter>
                <p className="text-sm text-muted-foreground">
                    {category.productCount || 0} productos en esta categoría
                </p>
                </CardFooter>
            </Card>
            ))}
        </div>
      )}
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Editar Categoría</DialogTitle>
                <DialogDescription>
                    Realiza cambios en tu categoría. Haz clic en guardar cuando termines.
                </DialogDescription>
            </DialogHeader>
            <CategoryForm
                category={editingCategory}
                onSave={handleEditCategory}
                onDone={() => setIsEditDialogOpen(false)}
            />
        </DialogContent>
      </Dialog>
    </div>
  );
}
