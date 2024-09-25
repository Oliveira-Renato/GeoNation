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

  if (loading) return <p>Carregando informações do país...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{countryInfo?.country}</h1>
      <Image
        src={countryInfo?.flag}
        alt={`${countryInfo?.country} Flag`}
        width={200}
        height={200}
      />
      <h2>Países Vizinhos:</h2>
      <ul>
        {countryInfo?.borders.map((borderCode) => {
          const borderCountry = countries.find(
            (country) => country.name === borderCode
          );
          return (
            <li key={borderCode}>
              {borderCountry ? (
                <Link href={`/country/${borderCountry.countryCode}`}>
                  {borderCountry.name}
                </Link>
              ) : (
                <span>{borderCode}</span>
              )}
            </li>
          );
        })}
      </ul>
      <h2>População ao Longo do Tempo:</h2>
      <PopulationChart data={countryInfo?.population} />
    </div>
  );
};

export default CountryPage;
