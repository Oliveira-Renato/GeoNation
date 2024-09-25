"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCountries } from "../../utils/api";

interface Country {
  countryCode: string;
  name: string;
}

const CountryList = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento
  const [error, setError] = useState<string | null>(null); // Estado de erro

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getCountries();
        setCountries(data);
      } catch (error) {
        setError("Erro ao buscar a lista de países.");
        console.error("Erro ao buscar a lista de países:", error);
      } finally {
        setLoading(false); // Parar carregamento
      }
    };

    fetchCountries();
  }, []);

  // Adicionando estilo para loading e error
  if (loading)
    return (
      <div className="flex items-center justify-center  w-full">
        <p className="text-lg text-gray-700">Carregando países...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center w-full">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Países</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {countries.map((country) => (
          <li
            key={country.countryCode}
            className="bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <Link
              href={`/country/${country.countryCode}`}
              className="block text-center"
            >
              <h2 className="font-semibold text-lg text-gray-900">
                {country.name}
              </h2>
              <p className="text-gray-500">{country.countryCode}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
