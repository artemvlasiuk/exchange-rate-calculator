import './Header.css';
import { useEffect, useState } from 'react';
import { fetchRates } from '../../utils/api';

export const Header = () => {
  const [usdToUah, setUsdToUah] = useState<number | null>(null);
  const [eurToUah, setEurToUah] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([fetchRates('USD'), fetchRates('EUR')]).then(
      ([usdData, eurData]) => {
        setUsdToUah(usdData.conversion_rates['UAH']);
        setEurToUah(eurData.conversion_rates['UAH']);
      }
    );
  }, []);

  return (
    <header className='header'>
      <div className='exchange-rates'>
        <p>USD to UAH: {usdToUah ? usdToUah.toFixed(2) : 'Loading...'}</p>
        <p>EUR to UAH: {eurToUah ? eurToUah.toFixed(2) : 'Loading...'}</p>
      </div>
    </header>
  );
};
