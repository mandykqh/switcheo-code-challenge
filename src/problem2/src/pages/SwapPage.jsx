import React, { useState, useEffect } from 'react';
import { IconButton, Text, Box, Flex, Spacer, VStack, Center } from '@chakra-ui/react'
import { fetchPriceData } from '../utils/pricesData';
import SelectInputToken from '../selectors/SelectInputToken';
import '../styles/styles.css'
import SelectInputValue from '../selectors/SelectInputValue';
import { ArrowDownIcon } from '@chakra-ui/icons'

const SwapPage = () => {
    const [currencyData, setCurrencyData] = useState([]);
    const [fromToken, setFromToken] = useState('');
    const [toToken, setToToken] = useState('');
    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');
    const [sendToReceiveConversion, setSendToReceiveConversion] = useState(true);

    useEffect(() => {
        fetchPriceData()
            .then(data => {
                setCurrencyData(data);
                console.log(data[0].currency);
                setFromToken(data[0].currency);
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
    }, [fromValue, toValue, fromToken, toToken]);

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
            setToValue(amountReceived.toFixed(3));
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
            setFromValue(amountToSend.toFixed(3));
        }
    }

    const handleToggleConversionType = (e) => {
        setSendToReceiveConversion(e);
    };

    return (
        <Center minH="80vh">
            <VStack spacing={4}>
                <Text textStyle='h3' color='rgba(26, 59, 77, 0.4)'>Currency Swap</Text>
                <Box w='548px' borderRadius={24} bgGradient='linear(to-r,#F6E2FF 0%, #CED2FF 15%, #F9FAFE 90%)'>
                    <Flex w='548px' px='20px' py='30px'>
                        <SelectInputToken currencyData={currencyData} selectedToken={(e) => {
                            handleTokenChange(e, 'from');
                        }} />
                        <Spacer />
                        <Flex flexDirection='column'>
                            <SelectInputValue value={fromValue} valueInput={(e) => {
                                handleInputChange(e, 'from');
                                handleToggleConversionType(true);
                            }} />
                            <Text textStyle='h2' ml='auto'>You Pay</Text>
                        </Flex>
                    </Flex>
                </Box>
                <IconButton
                    aria-label="Circular Icon"
                    icon={<ArrowDownIcon boxSize={6} color="rgba(26, 59, 77, 0.4)" />}
                    borderRadius="full"
                    bg="#FAFAFA"
                    color="white"
                    size="md"
                    zIndex={1}
                    position="absolute"
                    top="53%"
                    transform="translateY(0%)"
                />
                <Box w='548px' borderRadius={24} bgGradient='linear(to-l,#F6E2FF 0%, #CED2FF 15%, #F9FAFE 95%)'>
                    <Flex w='548px' px='20px' py='30px'>
                        <SelectInputToken currencyData={currencyData} selectedToken={(e) => {
                            handleTokenChange(e, 'to');
                        }} />
                        <Spacer />
                        <Flex flexDirection='column'>
                            <SelectInputValue ml='auto' value={toValue} valueInput={(e) => {
                                handleInputChange(e, 'to');
                                handleToggleConversionType(false);
                            }} />
                            <Text textStyle='h2' ml='auto'>You Receive</Text>
                        </Flex>
                    </Flex>
                </Box>
            </VStack>
        </Center >

    );
};

export default SwapPage;