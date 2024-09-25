interface Country {
  countryCode: string;
  name: string;
}

interface CountryInfoResponse {
  country: string;
  borders: string[];
  population: { year: number; value: number }[];
  flag: string;
}

export const getCountries = async (): Promise<Country[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/countries/`);
  if (!response.ok) {
    throw new Error("Erro ao buscar países");
  }
  const data = await response.json();
  return data;
};

export const getCountryInfo = async (
  code: string
): Promise<CountryInfoResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/country/${code}`
  );
  console.log(process.env.NEXT_PUBLIC_API_URL);
  if (!response.ok) {
    throw new Error("Erro ao buscar informações do país");
  }
  const data = await response.json();
  return data;
};
