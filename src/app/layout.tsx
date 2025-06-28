'use client';

import './globals.css';
import Header from '@/components/Header';
import { AuthProvider } from '@/contexts/AuthProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        <AuthProvider>
          <Header />
          <main className='p-10'>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
