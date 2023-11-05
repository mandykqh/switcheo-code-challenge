import React, { useEffect, useState } from 'react';
import { Select, Button, FormControl, FormLabel, Input, FormHelperText, Card, CardBody, Text } from '@chakra-ui/react'


const CurrencyExchangeForm = ({ currencyData }) => {
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [amtToSend, setAmtToSend] = useState('');
    const [amtToReceive, setAmtToReceive] = useState('');
    const [sendToReceiveConversion, setSendToReceiveConversion] = useState(true);


    useEffect(() => {
        if (sendToReceiveConversion) {
            handleToReceiveConversion();
        } else {
            handleToSendConversion();
        }
    }, [amtToSend, amtToReceive]);



    const handleToReceiveConversion = () => {
        const exchangeRateFrom = currencyData.find(item => item.currency === fromCurrency);
        const exchangeRateTo = currencyData.find(item => item.currency === toCurrency);

        if (exchangeRateFrom && exchangeRateTo) {
            const exchangeRate = exchangeRateTo.price / exchangeRateFrom.price;
            const amount = parseFloat(amtToSend);
            const amountReceived = amount * exchangeRate;
            setAmtToReceive(amountReceived.toFixed(5));
        }
    }

    const handleToggleConversionType = (e) => {
        setSendToReceiveConversion(e);
    };

    const handleToSendConversion = () => {
        const exchangeRateFrom = currencyData.find(item => item.currency === fromCurrency);
        const exchangeRateTo = currencyData.find(item => item.currency === toCurrency);

        if (exchangeRateFrom && exchangeRateTo) {
            const exchangeRate = exchangeRateTo.price / exchangeRateFrom.price;
            const receivedAmount = parseFloat(amtToReceive);
            const amountToSend = receivedAmount / exchangeRate;
            setAmtToSend(amountToSend.toFixed(5));
        }
    }

    return (
        <div>
            <h1>Currency Swap</h1>
            {/* <CurrencyCard /> */}
            <Card>
                <Select placeholder='Select option' onChange={(e) => {
                    setFromCurrency(e.target.value);
                    console.log(e.target.value);
                }}>
                    {currencyData.map((item, index) => (
                        <option key={index} value={item.currency}>
                            {item.currency}
                        </option>
                    ))}
                </Select>
                <FormControl>
                    <FormLabel>You Send</FormLabel>
                    <Input type='amount to send' value={amtToSend} onChange={(e) => {
                        setAmtToSend(e.target.value);
                        handleToggleConversionType(true);
                        console.log(e.target.value);
                    }} />
                </FormControl>
            </Card>
            <Card>
                <Select placeholder='Select option' onChange={(e) => {
                    setToCurrency(e.target.value);
                    console.log(e.target.value);
                }}>
                    {currencyData.map((item, index) => (
                        <option key={index} value={item.currency}>
                            {item.currency}
                        </option>
                    ))}
                </Select>
                <FormControl>
                    <FormLabel>You Get</FormLabel>
                    <Input type='amount to receive' value={amtToReceive} onChange={(e) => {
                        setAmtToReceive(e.target.value);
                        handleToggleConversionType(false);
                    }} />
                </FormControl>
            </Card>
        </div>
    );
};

export default CurrencyExchangeForm;