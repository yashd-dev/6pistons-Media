export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="text-foreground">
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {" "}
        {children}
      </section>
    </main>
  );
}
