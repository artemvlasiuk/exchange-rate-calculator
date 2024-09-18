const BASE_URL = 'https://v6.exchangerate-api.com/v6/';
const API_KEY = import.meta.env.VITE_API_KEY;
const CODES = 'codes';
const RATES = 'latest';

export const fetchRates = async (code: string) => {
  const response = await fetch(`${BASE_URL}/${API_KEY}/${RATES}/${code}`);
  const data = await response.json();

  return data;
};

export const fetchCodes = async () => {
  const response = await fetch(`${BASE_URL}/${API_KEY}/${CODES}`);
  const data = await response.json();

  return data;
};
