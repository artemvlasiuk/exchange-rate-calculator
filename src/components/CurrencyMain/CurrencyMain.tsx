import './CurrencyMain.css';
import { useEffect, useState } from 'react';
import { fetchCodes, fetchRates } from '../../utils/api';
import { convertAmount } from '../../utils/utils';

export const CurrencyMain = () => {
  const [codes, setCodes] = useState<[string, string][]>([]);
  const [firstAmount, setFirstAmount] = useState<number>(1);
  const [secondAmount, setSecondAmount] = useState<number>(0);
  const [firstCurrency, setFirstCurrency] = useState<string>('');
  const [secondCurrency, setSecondCurrency] = useState<string>('');
  const [rates, setRates] = useState<{ [key: string]: number }>({});

  const handleAmountChange = (amount: number, isFirst: boolean) => {
    if (isFirst) {
      setFirstAmount(amount);
      if (firstCurrency && secondCurrency) {
        setSecondAmount(
          convertAmount(amount, firstCurrency, secondCurrency, rates)
        );
      }
    } else {
      setSecondAmount(amount);
      if (firstCurrency && secondCurrency) {
        setFirstAmount(
          convertAmount(amount, secondCurrency, firstCurrency, rates)
        );
      }
    }
  };

  const handleCurrencyChange = (currency: string, isFirst: boolean) => {
    if (isFirst) {
      setFirstCurrency(currency);
      if (firstAmount && secondCurrency) {
        setSecondAmount(
          convertAmount(firstAmount, currency, secondCurrency, rates)
        );
      }
    } else {
      setSecondCurrency(currency);
      if (firstAmount && firstCurrency) {
        setSecondAmount(
          convertAmount(firstAmount, firstCurrency, currency, rates)
        );
      }
    }
  };

  useEffect(() => {
    fetchCodes().then((data) => {
      setCodes(data.supported_codes);
      setFirstCurrency(data.supported_codes[0][0]);
      setSecondCurrency(data.supported_codes[1][0]);
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
      <form className='container'>
        <div className='currency'>
          <select
            value={firstCurrency}
            onChange={(e) => handleCurrencyChange(e.target.value, true)}
          >
            {codes.map((code) => (
              <option key={code[0]} value={code[0]}>
                {`${code[0]} - ${code[1]}`}
              </option>
            ))}
          </select>
          <input
            type='number'
            step='1'
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
              <option key={code[0]} value={code[0]}>
                {`${code[0]} - ${code[1]}`}
              </option>
            ))}
          </select>
          <input
            type='number'
            step='1'
            value={secondAmount}
            onChange={(e) => handleAmountChange(Number(e.target.value), false)}
          />
        </div>
      </form>
    </main>
  );
};
