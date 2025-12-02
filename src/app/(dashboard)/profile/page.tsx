
'use client';

import * as React from 'react';
import { useUser, useFirestore, useDoc, useMemoFirebase, setDocumentNonBlocking, useAuth } from '@/firebase';
import { doc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import * as z from 'zod';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { User as UserIcon, Calendar, Mail, Edit, Camera } from 'lucide-react';
import { format } from 'date-fns';
import { ProfileForm } from './components/profile-form';
import { ProfilePictureEditor } from './components/profile-picture-editor';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  registrationDate: string;
}

const profileFormSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    username: z.string().min(2, 'El nombre de usuario debe tener al menos 2 caracteres.'),
});

export default function ProfilePage() {
  const { user: authUser, isUserLoading: isAuthLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isPictureDialogOpen, setIsPictureDialogOpen] = React.useState(false);

  const userDocRef = useMemoFirebase(() => {
    if (!firestore || !authUser?.uid) return null;
    return doc(firestore, `users/${authUser.uid}`);
  }, [firestore, authUser?.uid]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);

  const isLoading = isAuthLoading || isProfileLoading;

  const handleProfileUpdate = async (data: z.infer<typeof profileFormSchema>) => {
    if (!userDocRef || !authUser) return;

    try {
        await setDocumentNonBlocking(userDocRef, data, { merge: true });

        const newDisplayName = data.username;
        if (authUser.displayName !== newDisplayName) {
            await updateProfile(authUser, { displayName: newDisplayName });
        }
        
        toast({
            title: 'Perfil actualizado',
            description: 'Tu información ha sido guardada con éxito.',
        });

        setIsEditDialogOpen(false);

    } catch (error) {
        console.error("Error updating profile:", error);
        toast({
            variant: "destructive",
            title: 'Error al actualizar',
            description: 'No se pudo guardar tu información. Inténtalo de nuevo.',
        });
    }
  };

  const handlePictureUpdateSuccess = () => {
    setIsPictureDialogOpen(false);
    toast({
        title: 'Foto de perfil actualizada',
        description: 'Tu nueva foto de perfil ha sido guardada.',
    });
  };

  const renderInfoRow = (Icon: React.ElementType, label: string, value?: string | null) => {
    if (!value) return null;
    return (
      <div className="flex items-center gap-4">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="font-medium">{value}</p>
        </div>
      </div>
    );
  };
  
  const getInitials = (firstName?: string | null, lastName?: string | null, username?: string) => {
    if (firstName && lastName) {
        return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    if (username) {
        return username.slice(0, 2).toUpperCase();
    }
    return <UserIcon className="h-6 w-6" />;
  }

  if (isLoading || !userProfile) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-semibold">Mi Perfil</h1>
        <Card>
          <CardHeader className="flex flex-col items-center gap-4 sm:flex-row">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <Skeleton className="h-7 w-40" />
              <Skeleton className="h-5 w-60" />
            </div>
            <Skeleton className="h-10 w-24" />
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-semibold">Mi Perfil</h1>
      <Card>
        <CardHeader className="flex flex-col items-center gap-4 border-b p-6 sm:flex-row">
          <Dialog open={isPictureDialogOpen} onOpenChange={setIsPictureDialogOpen}>
            <DialogTrigger asChild>
                <div className="relative group cursor-pointer">
                    <Avatar className="h-24 w-24 text-3xl">
                        {authUser?.photoURL ? (
                        <AvatarImage src={authUser.photoURL} alt={userProfile.username} />
                        ) : (
                        <AvatarFallback>{getInitials(userProfile.firstName, userProfile.lastName, userProfile.username)}</AvatarFallback>
                        )}
                    </Avatar>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="h-8 w-8 text-white" />
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Foto de Perfil</DialogTitle>
                </DialogHeader>
                <ProfilePictureEditor onUploadSuccess={handlePictureUpdateSuccess} />
            </DialogContent>
          </Dialog>

          <div className="flex-1 space-y-1 text-center sm:text-left">
            <CardTitle className="text-2xl">
              {userProfile.firstName && userProfile.lastName 
                ? `${userProfile.firstName} ${userProfile.lastName}` 
                : userProfile.username}
            </CardTitle>
            <CardDescription>{`@${userProfile.username}`}</CardDescription>
          </div>
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Edit className="mr-2 h-4 w-4" />
                    Editar Perfil
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Perfil</DialogTitle>
                </DialogHeader>
                <ProfileForm 
                    profile={userProfile} 
                    onSave={handleProfileUpdate} 
                    onDone={() => setIsEditDialogOpen(false)} 
                />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="grid gap-6 p-6 md:grid-cols-2">
            {renderInfoRow(Mail, 'Email', userProfile.email)}
            {renderInfoRow(
              Calendar,
              'Miembro desde',
              format(new Date(userProfile.registrationDate), 'dd MMM, yyyy')
            )}
        </CardContent>
      </Card>
    </div>
  );
}
