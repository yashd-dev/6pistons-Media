export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-background text-foreground">
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {" "}
        {children}
      </section>
    </main>
  );
}
