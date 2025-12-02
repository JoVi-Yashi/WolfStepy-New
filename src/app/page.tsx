"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/firebase';

export default function Home() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    if (!isUserLoading) {
      if (user) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    }
  }, [user, isUserLoading, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-primary"></div>
    </div>
  );
}
