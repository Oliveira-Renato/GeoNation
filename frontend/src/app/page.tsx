import CountryList from "@/components/CountryList";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-50">GeoNation</h1>
        <p className="text-gray-100 mt-2">
          Explore countries and their populations
        </p>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        <CountryList />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center py-4">
        <p className="text-gray-500">
          &copy; 2024 GeoNation. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
