import Footer from "@/components/Footer";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className={`flex h-screen bg-[url('/image/organizing_back.png')] bg-cover bg-center `}>
        <main className="flex-1 overflow-y-auto">
          {children}
          <Footer />
        </main>
      </div>
    </main>
  );
}

