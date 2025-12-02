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

const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  username: z.string().min(2, 'El nombre de usuario debe tener al menos 2 caracteres.'),
});

interface UserProfile {
    username: string;
    firstName?: string;
    lastName?: string;
}

interface ProfileFormProps {
  profile: UserProfile;
  onSave: (data: z.infer<typeof formSchema>) => void;
  onDone: () => void;
}

export function ProfileForm({ profile, onSave, onDone }: ProfileFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        username: profile.username || '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                    <Input placeholder="Tu nombre" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                    <Input placeholder="Tu apellido" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input placeholder="Tu nombre de usuario" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onDone}>
            Cancelar
          </Button>
          <Button type="submit">Guardar Cambios</Button>
        </div>
      </form>
    </Form>
  );
}
