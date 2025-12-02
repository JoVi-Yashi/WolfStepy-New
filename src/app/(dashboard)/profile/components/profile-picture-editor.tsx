'use client';

import React, { useState, useRef } from 'react';
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useStorage } from '@/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ProfilePictureEditorProps {
  onUploadSuccess: () => void;
}

// Helper function to create a cropped image blob
function getCroppedImg(image: HTMLImageElement, crop: Crop): Promise<Blob> {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    // Ensure canvas dimensions are integers
    canvas.width = Math.floor(crop.width * scaleX);
    canvas.height = Math.floor(crop.height * scaleY);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return Promise.reject(new Error('No se pudo obtener el contexto del lienzo 2D.'));
    }

    // Draw the cropped image onto the canvas
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    // Convert canvas to blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          reject(new Error('La creación del blob de imagen falló.'));
          return;
        }
        resolve(blob);
      }, 'image/jpeg', 0.95); // Use high quality JPEG
    });
}


export function ProfilePictureEditor({ onUploadSuccess }: ProfilePictureEditorProps) {
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop>();
  const [isUploading, setIsUploading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const { toast } = useToast();
  const auth = useAuth();
  const storage = useStorage();
  const user = auth.currentUser;

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); 
      const reader = new FileReader();
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const aspect = 1; // Square aspect ratio
    const newCrop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        aspect,
        width,
        height
      ),
      width,
      height
    );
    setCrop(newCrop);
    setCompletedCrop(newCrop); // Set an initial completed crop
  };

  const handleUpload = async () => {
    if (!completedCrop || !imgRef.current) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Por favor, selecciona y recorta una imagen primero.',
      });
      return;
    }

    if (!user) {
        toast({ variant: 'destructive', title: 'Error de Autenticación', description: 'Usuario no encontrado.' });
        return;
    }
      
    if (!storage) {
        toast({ variant: 'destructive', title: 'Error de Servicio', description: 'El servicio de almacenamiento no está disponible.' });
        return;
    }

    setIsUploading(true);

    try {
      // 1. Get the cropped image as a Blob
      const croppedImageBlob = await getCroppedImg(imgRef.current, completedCrop);
      
      // 2. Define the storage path
      const storageRef = ref(storage, `profilePictures/${user.uid}`);
      
      // 3. Upload the Blob to Firebase Storage
      const snapshot = await uploadBytes(storageRef, croppedImageBlob);
      
      // 4. Get the public URL of the uploaded image
      const downloadURL = await getDownloadURL(snapshot.ref);

      // 5. Update the user's profile with the new photo URL
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { photoURL: downloadURL });
      }

      // 6. Notify parent component of success
      onUploadSuccess();

    } catch (error: any) {
      console.error('Fallo al subir la foto de perfil:', error);
      toast({
        variant: 'destructive',
        title: 'Error al subir la imagen',
        description: error.message || 'No se pudo guardar la foto de perfil. Inténtalo de nuevo.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Input type="file" accept="image/*" onChange={onSelectFile} disabled={isUploading}/>
      {imgSrc && (
        <div className="flex justify-center">
            <ReactCrop
                crop={crop}
                onChange={c => setCrop(c)}
                onComplete={c => setCompletedCrop(c)}
                aspect={1}
                circularCrop
                keepSelection
            >
                <img
                    ref={imgRef}
                    alt="Recortar imagen"
                    src={imgSrc}
                    onLoad={onImageLoad}
                    style={{ maxHeight: '70vh' }}
                />
            </ReactCrop>
        </div>
      )}
      <div className="flex justify-end">
        <Button onClick={handleUpload} disabled={!completedCrop || isUploading}>
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subiendo...
            </>
          ) : (
            'Guardar Foto'
          )}
        </Button>
      </div>
    </div>
  );
}
