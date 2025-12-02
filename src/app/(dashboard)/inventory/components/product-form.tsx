'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type Product, type Category, productSchema } from '@/lib/schema';
import { suggestDescription } from '@/ai/flows/suggest-description-flow';
import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';


interface ProductFormProps {
  product?: Product;
  onSave: (product: Omit<Product, 'id'|'userId'>) => void;
  onDone: () => void;
  categories: Category[];
}

const formSchema = productSchema.omit({ id: true, userId: true });

export function ProductForm({ product, onSave, onDone, categories }: ProductFormProps) {
  const [isSuggesting, setIsSuggesting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: product
      ? { ...product, description: product.description || '' }
      : {
          title: '',
          description: '',
          etapa: 'Juvenil',
          categoria: categories[0]?.name || '',
          size: '',
          color: '#000000',
          colorName: 'Negro',
          stock: 0,
          imageUrl: '',
        },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(values);
    onDone();
  }

  const handleSuggestDescription = async () => {
    const { title, categoria, etapa } = form.getValues();
    if (!title) {
        form.setError('title', { type: 'manual', message: 'Por favor, introduce un título primero.' });
        return;
    }
    setIsSuggesting(true);
    try {
        const description = await suggestDescription({ title, category: categoria, stage: etapa });
        form.setValue('description', description);
        form.clearErrors('description');
    } catch (error) {
        console.error("Failed to suggest description:", error);
    } finally {
        setIsSuggesting(false);
    }
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative">
            <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Nombre del Producto</FormLabel>
                <FormControl>
                    <Input placeholder="p. ej. Zapatilla Cosmic Glide" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="absolute top-[26px] right-0 text-primary hover:text-primary"
                onClick={handleSuggestDescription}
                disabled={isSuggesting}
            >
                {isSuggesting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <Sparkles className="h-4 w-4" />
                )}
                Sugerir con IA
            </Button>
        </div>

        <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                    <Textarea 
                        placeholder="Una descripción atractiva generada por IA aparecerá aquí..." 
                        {...field}
                        rows={4}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL de la Imagen</FormLabel>
              <FormControl>
                <Input placeholder="https://picsum.photos/seed/1/200/200" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="categoria"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="etapa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Etapa</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una etapa" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Juvenil">Juvenil</SelectItem>
                    <SelectItem value="Adulto">Adulto</SelectItem>
                    <SelectItem value="Niños">Niños</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Talla</FormLabel>
                    <FormControl>
                    <Input placeholder="p. ej. US 9" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                        <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10) || 0)
                        }
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="colorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Color</FormLabel>
                <FormControl>
                  <Input placeholder="p. ej. Azul Cielo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hex del Color</FormLabel>
                <FormControl>
                  <Input type="color" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onDone}>
            Cancelar
          </Button>
          <Button type="submit">Guardar Producto</Button>
        </div>
      </form>
    </Form>
  );
}
