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
import { useAuth, initiateEmailSignIn } from '@/firebase';
import React from 'react';


const formSchema = z.object({
  email: z.string().email({ message: 'Por favor, introduce un email válido.' }),
  password: z.string().min(1, { message: 'La contraseña es requerida.' }),
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!auth) return;
    try {
      initiateEmailSignIn(auth, values.email, values.password);
      router.push('/dashboard');
    } catch (error: any) {
       let description = 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        description = 'Email o contraseña inválidos.';
      }
      toast({
        variant: 'destructive',
        title: 'Inicio de sesión fallido',
        description,
      });
    }
  }
  
  React.useEffect(() => {
    if (!auth) return;
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        router.push('/dashboard');
      }
    });
    const unsubscribeError = auth.beforeAuthStateChanged(user => user, error => {
      let description = 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        description = 'Email o contraseña inválidos.';
      }
      setErrorMessage(description);
      return Promise.reject(error);
    });

    return () => {
      unsubscribe();
      unsubscribeError();
    };
  }, [auth, router]);

  React.useEffect(() => {
    if (errorMessage) {
      toast({
        variant: 'destructive',
        title: 'Inicio de sesión fallido',
        description: errorMessage,
      });
      setErrorMessage(null);
    }
  }, [errorMessage, toast]);


  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Logo />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
            Inicia sesión en tu cuenta
          </h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              {form.formState.isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </form>
        </Form>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          ¿No tienes una cuenta?{' '}
          <Link
            href="/signup"
            className="font-medium text-primary hover:underline"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
