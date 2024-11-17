'use client'
import { SessionProvider } from "next-auth/react";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (<main>
    <div className="flex h-screen">
      <main className="flex-1 md:p-8 pt-2 p-8 overflow-y-auto">
        <SessionProvider>
          {children}
        </SessionProvider>
      </main>
    </div>
  </main>
  )
}
