export const convertAmount = (
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: { [key: string]: number }
): number => {
  const rate = rates[toCurrency] / rates[fromCurrency];
  return parseFloat((amount * rate).toFixed(2));
};
