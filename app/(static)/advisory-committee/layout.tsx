export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className={`flex min-h-screen bg-[url('/image/advisory_back.png')] bg-fixed bg-no-repeat md:bg-cover bg-center bg-[length:auto_100%] md:bg-auto`}>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </main>
  );
}
