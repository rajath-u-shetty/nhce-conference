import { checkAuth } from "@/lib/auth/utils";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth()
  return (
    <main>
      <div className={`flex h-screen bg-[url('/image/about_back.png')] bg-cover bg-center `}>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </main>
  )
}
