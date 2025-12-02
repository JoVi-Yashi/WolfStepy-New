'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { type Category } from '@/lib/schema';


interface CategoryFormProps {
  category?: Category;
  onSave: (category: Omit<Category, 'id' | 'productCount' | 'userId'>) => void;
  onDone: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres.'),
  attributes: z.string().min(1, 'Debes proporcionar al menos un atributo.'),
});

export function CategoryForm({ category, onSave, onDone }: CategoryFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: category
      ? { ...category, attributes: category.attributes.join(', ') }
      : {
          name: '',
          description: '',
          attributes: '',
        },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newOrUpdatedCategory = {
      ...values,
      attributes: values.attributes.split(',').map(attr => attr.trim()),
    };
    onSave(newOrUpdatedCategory);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la Categoría</FormLabel>
              <FormControl>
                <Input placeholder="p. ej. Zapatillas" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe brevemente la categoría."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="attributes"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Atributos</FormLabel>
                <FormControl>
                    <Input placeholder="Material, Talla, Color..." {...field} />
                </FormControl>
                <FormDescription>
                    Separa los atributos con comas.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
        />
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onDone}>
            Cancelar
          </Button>
          <Button type="submit">Guardar Categoría</Button>
        </div>
      </form>
    </Form>
  );
}
