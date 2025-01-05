export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[url('/image/main_back.png')] bg-cover bg-center bg-fixed">
      {children}
    </div>
  );
}
