import './CurrencyMain.css';
import { useEffect, useState } from 'react';
import { fetchCodes, fetchRates } from '../../utils/api';

export const CurrencyMain = () => {
  const [codes, setCodes] = useState<string[]>([]);
  const [firstAmount, setFirstAmount] = useState<number>(1);
  const [secondAmount, setSecondAmount] = useState<number>(0);
  const [firstCurrency, setFirstCurrency] = useState<string>('');
  const [secondCurrency, setSecondCurrency] = useState<string>('');
  const [rates, setRates] = useState<{ [key: string]: number }>({});

  const convertAmount = (
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ) => {
    const rate = rates[toCurrency] / rates[fromCurrency];
    return parseFloat((amount * rate).toFixed(2));
  };

  const handleAmountChange = (amount: number, isFirst: boolean) => {
    if (isFirst) {
      setFirstAmount(amount);
      if (firstCurrency && secondCurrency) {
        setSecondAmount(convertAmount(amount, firstCurrency, secondCurrency));
      }
    } else {
      setSecondAmount(amount);
      if (firstCurrency && secondCurrency) {
        setFirstAmount(convertAmount(amount, secondCurrency, firstCurrency));
      }
    }
  };

  const handleCurrencyChange = (currency: string, isFirst: boolean) => {
    if (isFirst) {
      setFirstCurrency(currency);
      if (firstAmount && secondCurrency) {
        setSecondAmount(convertAmount(firstAmount, currency, secondCurrency));
      }
    } else {
      setSecondCurrency(currency);
      if (firstAmount && firstCurrency) {
        setSecondAmount(convertAmount(firstAmount, firstCurrency, currency));
      }
    }
  };

  useEffect(() => {
    fetchCodes().then((data) => {
      const codes = data.supported_codes.map(
        (code: [string, string]) => code[0]
      );

      setCodes(codes);
      setFirstCurrency(codes[0]);
      setSecondCurrency(codes[1]);
    });
  }, []);

  useEffect(() => {
    if (firstCurrency) {
      fetchRates(firstCurrency).then((data) => {
        setRates(data.conversion_rates);
      });
    }
  }, [firstCurrency]);

  return (
    <main className='main'>
      <img src='/money.png' alt='money' className='money-img'></img>
      <h1>Exchange Rate Calculator</h1>
      <p>Choose the currency and the amounts to get the exchange rate</p>
      <div className='container'>
        <div className='currency'>
          <select
            value={firstCurrency}
            onChange={(e) => handleCurrencyChange(e.target.value, true)}
          >
            {codes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          <input
            type='number'
            step='0.01'
            value={firstAmount}
            onChange={(e) => handleAmountChange(Number(e.target.value), true)}
          />
        </div>

        <div className='currency'>
          <select
            value={secondCurrency}
            onChange={(e) => handleCurrencyChange(e.target.value, false)}
          >
            {codes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          <input
            type='number'
            step='0.01'
            value={secondAmount}
            onChange={(e) => handleAmountChange(Number(e.target.value), false)}
          />
        </div>
      </div>
    </main>
  );
};
