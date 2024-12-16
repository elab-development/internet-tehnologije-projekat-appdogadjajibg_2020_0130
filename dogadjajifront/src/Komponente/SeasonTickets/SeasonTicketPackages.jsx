import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SeasonTicketPackages.css';  

const SeasonTicketPackages = () => {
    const [currency, setCurrency] = useState('USD');
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const prices = {
        basic: 99,
        standard: 199,
        vip: 299
    };

    const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD'];

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await axios.get(`https://v6.exchangerate-api.com/v6/97881401fc7e1ad5c8095cd5/latest/USD`);
                setRates(response.data.conversion_rates);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchRates();
    }, []);

    const convertPrice = (priceInUSD) => {
        return (priceInUSD * (rates[currency] || 1)).toFixed(2);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="packages-container">
            <div className="currency-selector">
                <label htmlFor="currency">Choose your currency:</label>
                <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    {currencies.map((cur) => (
                        <option key={cur} value={cur}>{cur}</option>
                    ))}
                </select>
            </div>
            <div className="packages">
                <div className="package basic">
                    <h2>Basic</h2>
                    <p>{convertPrice(prices.basic)} {currency} / year</p>
                    <ul>
                        <li>Access to all events</li>
                        <li>Regular seating</li>
                        <li>Email support</li>
                    </ul>
                </div>
                <div className="package standard">
                    <h2>Standard</h2>
                    <p>{convertPrice(prices.standard)} {currency} / year</p>
                    <ul>
                        <li>Access to all events</li>
                        <li>Premium seating</li>
                        <li>Priority email support</li>
                    </ul>
                </div>
                <div className="package vip">
                    <h2>VIP</h2>
                    <p>{convertPrice(prices.vip)} {currency} / year</p>
                    <ul>
                        <li>Access to all events</li>
                        <li>VIP seating</li>
                        <li>24/7 support</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SeasonTicketPackages;
