import { FetchCodesResponse, FetchRatesResponse } from '../types';

const BASE_URL = 'https://v6.exchangerate-api.com/v6/';
const API_KEY = import.meta.env.VITE_API_KEY;
const CODES = 'codes';
const RATES = 'latest';

export const fetchRates = async (code: string): Promise<FetchRatesResponse> => {
  const response = await fetch(`${BASE_URL}/${API_KEY}/${RATES}/${code}`);
  return await response.json();
};

export const fetchCodes = async (): Promise<FetchCodesResponse> => {
  const response = await fetch(`${BASE_URL}/${API_KEY}/${CODES}`);
  return await response.json();
};
