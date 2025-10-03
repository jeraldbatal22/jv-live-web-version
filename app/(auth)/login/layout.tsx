import { Suspense } from 'react';

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<div>Loading login...</div>}>
      {children}
    </Suspense>
  );
}
