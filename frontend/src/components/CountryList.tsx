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
  const [loading, setLoading] = useState<boolean>(true); // State of loading
  const [error, setError] = useState<string | null>(null); // State de error

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getCountries();
        setCountries(data);
      } catch (error) {
        setError("Error to fetch countries list.");
        console.error("Error ao to fetch countries list:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchCountries();
  }, []);

  if (loading) return <p>Carregando países...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.countryCode}>
          <Link href={`/country/${country.countryCode}`}>{country.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
