'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Logo } from '@/components/logo';
import { useAuth, useFirestore, setDocumentNonBlocking, initiateEmailSignUp } from '@/firebase';
import { updateProfile } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import React from 'react';

const formSchema = z.object({
  username: z.string().min(2, { message: 'El nombre de usuario debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, introduce un email válido.' }),
  password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' }),
});

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!auth || !firestore) return;
    initiateEmailSignUp(auth, values.email, values.password);
  }

  React.useEffect(() => {
    if (!auth || !firestore) return;

    const handleUserCreation = async (user: import('firebase/auth').User | null) => {
        if (user && user.displayName === null) { // Process only new users from this flow
            const values = form.getValues();
            try {
                await updateProfile(user, {
                    displayName: values.username,
                });
    
                const userDocRef = doc(firestore, 'users', user.uid);
                const userData = {
                    id: user.uid,
                    username: values.username,
                    email: values.email,
                    firstName: '',
                    lastName: '',
                    registrationDate: new Date().toISOString(),
                };
    
                await setDocumentNonBlocking(userDocRef, userData, { merge: true });
                
                toast({
                    title: 'Cuenta creada',
                    description: "Hemos creado tu cuenta.",
                });

                router.push('/dashboard');

            } catch (error) {
                console.error("Error setting up new user:", error);
            }
        }
    };
    
    const unsubscribe = auth.onIdTokenChanged(handleUserCreation);

    const unsubscribeError = auth.beforeAuthStateChanged(user => user, error => {
      let description = 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
      if (error.code === 'auth/email-already-in-use') {
        description = 'Este email ya está en uso.';
      }
      setErrorMessage(description);
      return Promise.reject(error);
    });

    return () => {
        unsubscribe();
        unsubscribeError();
    };

  }, [auth, firestore, form, router, toast]);

  React.useEffect(() => {
    if (errorMessage) {
      toast({
        variant: 'destructive',
        title: 'Fallo al registrarse',
        description: errorMessage,
      });
      setErrorMessage(null);
      form.reset(); // Reset form on error
    }
  }, [errorMessage, toast, form]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Logo />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
            Crea tu cuenta
          </h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección de email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="tu@ejemplo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
            </Button>
          </form>
        </Form>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          ¿Ya tienes una cuenta?{' '}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
