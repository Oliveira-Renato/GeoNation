"use client";
import { useEffect, useState } from "react";
import { getCountries, getCountryInfo } from "../../../../utils/api";
import Image from "next/image";
import Link from "next/link";
import PopulationChart from "@/components/PopulationChart";

interface CountryInfoResponse {
  country: string;
  borders: string[];
  population: { year: number; value: number }[];
  flag: string;
}

interface Country {
  countryCode: string;
  name: string;
}

const CountryPage = ({ params }: { params: { code: string } }) => {
  const [countryInfo, setCountryInfo] = useState<CountryInfoResponse | null>(
    null
  );
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      if (params.code) {
        try {
          const data = await getCountryInfo(params.code);
          setCountryInfo(data);
        } catch (error) {
          setError("Erro ao buscar informações do país.");
          console.error("Erro ao buscar informações do país:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCountryInfo();
  }, [params.code]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getCountries();
        console.log("Dados recebidos:", data);
        setCountries(data);
      } catch (error) {
        setError("Erro ao buscar a lista de países.");
        console.error("Erro ao buscar a lista de países:", error);
      }
    };

    fetchCountries();
  }, []);

  // Adicionando estilo para loading e error
  if (loading)
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-lg text-gray-700 ">
          Carregando informações do país...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-lg text-red-500 ">{error}</p>
      </div>
    );

  return (
    <div className="p-6 rounded shadow-md max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">
        {countryInfo?.country}
      </h1>
      <Image
        src={countryInfo?.flag}
        alt={`${countryInfo?.country} Flag`}
        width={200}
        height={200}
        className="mx-auto mb-4 rounded"
      />
      <h2 className="text-2xl font-semibold mt-6 mb-2">Países Vizinhos:</h2>
      <ul className="list-disc list-inside mb-6">
        {countryInfo?.borders.map((borderCode) => {
          const borderCountry = countries.find(
            (country) => country.name === borderCode
          );
          return (
            <li key={borderCode} className="mb-1">
              {borderCountry ? (
                <Link
                  href={`/country/${borderCountry.countryCode}`}
                  className="text-blue-500 hover:underline"
                >
                  {borderCountry.name}
                </Link>
              ) : (
                <span className="text-gray-500">{borderCode}</span>
              )}
            </li>
          );
        })}
      </ul>
      <h2 className="text-2xl font-semibold mt-6 mb-2">
        População ao Longo do Tempo:
      </h2>
      <PopulationChart data={countryInfo?.population} />
    </div>
  );
};

export default CountryPage;
