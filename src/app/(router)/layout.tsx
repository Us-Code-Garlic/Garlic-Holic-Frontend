'use client';

import Navbar from '../components/Navbar';

export default function RouterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="w-full flex-1 overflow-y-auto">
        {children}
      </main>
    </>
  );
} 