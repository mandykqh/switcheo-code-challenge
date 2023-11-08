import React, { useState, useEffect } from 'react';
import { fetchPriceData } from '../utils/pricesData';
import SelectInputToken from '../selectors/SelectInputToken';
import '../styles/styles.css'
import SelectInputValue from '../selectors/SelectInputValue';

const SwapPage = () => {
    const [currencyData, setCurrencyData] = useState([]);
    const [fromToken, setFromToken] = useState('');
    const [toToken, setToToken] = useState('');
    const [fromValue, setFromValue] = useState(0);
    const [toValue, setToValue] = useState(0);
    const [sendToReceiveConversion, setSendToReceiveConversion] = useState(true);

    useEffect(() => {
        // Fetch the data when the component mounts
        fetchPriceData()
            .then(data => {
                setCurrencyData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        console.log(sendToReceiveConversion)
        if (sendToReceiveConversion) {
            handleToReceiveConversion();
        } else {
            handleToSendConversion();
        }
    }, [fromValue, toValue]);

    const handleTokenChange = (e, targetState) => {
        if (targetState === 'from') {
            setFromToken(e);
            console.log('From Token:', e);
        } else if (targetState === 'to') {
            setToToken(e);
            console.log('To Token:', e);
        }
    };
    const handleInputChange = (e, targetState) => {
        if (targetState === 'from') {
            setFromValue(e);
            console.log('From input:', e);
        } else if (targetState === 'to') {
            setToValue(e);
            console.log('To value:', e);
        }
    }

    const handleToReceiveConversion = () => {
        console.log('handle to recv conv');
        const exchangeRateFrom = currencyData.find(item => item.currency === fromToken);
        const exchangeRateTo = currencyData.find(item => item.currency === toToken);
        console.log(`${exchangeRateFrom} | ${exchangeRateTo}`);
        if (exchangeRateFrom && exchangeRateTo) {
            const exchangeRate = exchangeRateTo.price / exchangeRateFrom.price;
            const amount = parseFloat(fromValue);
            const amountReceived = amount * exchangeRate;
            setToValue(amountReceived.toFixed(5));
        }
    }
    const handleToSendConversion = () => {
        console.log('handle to send conv');
        const exchangeRateFrom = currencyData.find(item => item.currency === fromToken);
        const exchangeRateTo = currencyData.find(item => item.currency === toToken);

        if (exchangeRateFrom && exchangeRateTo) {
            const exchangeRate = exchangeRateTo.price / exchangeRateFrom.price;
            const receivedAmount = parseFloat(toValue);
            const amountToSend = receivedAmount / exchangeRate;
            setFromValue(amountToSend.toFixed(5));
        }
    }

    const handleToggleConversionType = (e) => {
        setSendToReceiveConversion(e);
    };

    return (
        <div>
            <SelectInputToken currencyData={currencyData} selectedToken={(e) => {
                handleTokenChange(e, 'from');
            }} />
            <span>You Pay</span>
            <SelectInputValue value={fromValue} valueInput={(e) => {
                handleInputChange(e, 'from');
                handleToggleConversionType(true);
            }} />
            <SelectInputToken currencyData={currencyData} selectedToken={(e) => {
                handleTokenChange(e, 'to');
            }} />
            <span>You Receive</span>
            <SelectInputValue value={toValue} valueInput={(e) => {
                handleInputChange(e, 'to');
                handleToggleConversionType(false);
            }} />
        </div>
    );
};

export default SwapPage;