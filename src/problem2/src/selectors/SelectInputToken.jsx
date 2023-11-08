import React, { useState } from 'react';
import Select from 'react-select';
import '../styles/styles.css'

const SelectInputToken = ({ currencyData, selectedToken, targetState }) => {
    const TOKEN_SVG_PATH = '../assets/tokens/'
    const [input, setInput] = useState('');
    return (
        <>

            <Select
                placeholder='Select option'
                onChange={(selectedOption) => {
                    setInput(selectedOption.value);
                    selectedToken(selectedOption.value, targetState);
                }}
                options={currencyData.map((item) => ({ value: item.currency, label: item.currency }))}
                className='select-input-token'
                components={{
                    IndicatorSeparator: () => null
                }}

            />
        </>
    );
};

export default SelectInputToken;
