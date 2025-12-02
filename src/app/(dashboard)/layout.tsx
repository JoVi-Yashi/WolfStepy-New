'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  Boxes,
  LayoutDashboard,
  Package,
  User as UserIcon,
  LogOut,
  UserCog,
} from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { useUser, useAuth } from '@/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect } from 'react';
import { ThemeSwitcher } from '@/components/theme-switcher';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleLogout = () => {
    if (auth) {
      auth.signOut();
    }
  };

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-primary"></div>
      </div>
    );
  }
  
  const getInitials = (name?: string | null) => {
    if (!name) return <UserIcon className="h-5 w-5" />;
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/dashboard" passHref>
                <SidebarMenuButton
                  as="a"
                  isActive={isActive('/dashboard')}
                  tooltip="Panel de Control"
                >
                  <LayoutDashboard />
                  <span>Panel de Control</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/inventory" passHref>
                <SidebarMenuButton
                  as="a"
                  isActive={isActive('/inventory')}
                  tooltip="Inventario"
                >
                  <Package />
                  <span>Inventario</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/categories" passHref>
                <SidebarMenuButton
                  as="a"
                  isActive={isActive('/categories')}
                  tooltip="Categorías"
                >
                  <Boxes />
                  <span>Categorías</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/profile" passHref>
                <SidebarMenuButton
                  as="a"
                  isActive={isActive('/profile')}
                  tooltip="Perfil"
                >
                  <UserCog />
                  <span>Perfil</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <ThemeSwitcher />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:h-14 md:justify-end">
          <SidebarTrigger className="md:hidden" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  {user?.photoURL ? (
                    <AvatarImage src={user.photoURL} alt={user.displayName || 'Avatar de usuario'} />
                  ) : (
                    <AvatarFallback>
                      {getInitials(user?.displayName)}
                    </AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.displayName || 'Usuario'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">
                    <UserCog className="mr-2 h-4 w-4" />
                    <span>Mi Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
