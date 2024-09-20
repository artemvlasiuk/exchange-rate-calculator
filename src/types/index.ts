export interface ConversionRates {
  [key: string]: number;
}

export interface FetchRatesResponse {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  conversion_rates: ConversionRates;
}

export interface FetchCodesResponse {
  result: string;
  documentation: string;
  terms_of_use: string;
  supported_codes: [string, string][];
}
