import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'WolfStep Inventory',
  description: 'AI-Powered Inventory Management for Footwear',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Parisienne&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <FirebaseClientProvider>
            {children}
            </FirebaseClientProvider>
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
