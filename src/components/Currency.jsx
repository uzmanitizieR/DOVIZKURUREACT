import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Currency() {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [result, setResult] = useState(null);
    const [rates, setRates] = useState({});
    const BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
    const API_KEY = "fca_live_F5UYxMonfVSVMyTs8NWdhguYNdoj0LdtgfM3VpbA";

    // Fetch exchange rates on component mount using Axios
    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await axios.get(`${BASE_URL}`, {
                    params: { apikey: API_KEY }
                });
                setRates(response.data.data); // API'den gelen döviz kurunu kaydet
            } catch (error) {
                console.error('Error fetching exchange rates:', error);
            }
        };

        fetchRates();
    }, []);

    // Convert function
    const handleConvert = () => {
        if (rates[fromCurrency] && rates[toCurrency]) {
            const rate = rates[toCurrency] / rates[fromCurrency];
            setResult((amount * rate).toFixed(2)); // Sonucu hesapla ve güncelle
        }
    };

    return (
        <div className='currency-div' style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h2>Currency Converter</h2>
            <div>
                <label>
                    Amount:
                    <input
                        type='number'
                        className='amount'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    From:
                    <select
                        className='from-currency-option'
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                    >
                        {Object.keys(rates).map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    To:
                    <select
                        className='to-currency-option'
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                    >
                        {Object.keys(rates).map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <button onClick={handleConvert} style={{ margin: '10px 0', padding: '10px 20px' }}>
                Convert
            </button>
            <div>
                <label>
                    Result:
                    <input
                        type='number'
                        className='result'
                        value={result || ''}
                        readOnly
                    />
                </label>
            </div>
        </div>
    );
}

export default Currency;
