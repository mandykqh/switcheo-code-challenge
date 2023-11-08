import React, { useState } from 'react';
import Select from 'react-select';
import '../styles/styles.css'

const SelectInputToken = ({ currencyData, selectedToken, targetState }) => {
    const TOKEN_SVG_PATH = '../assets/tokens/'
    const [input, setInput] = useState('');

    return (
        <>
            <Select
                placeholder='Select'
                onChange={(selectedOption) => {
                    setInput(selectedOption.value);
                    selectedToken(selectedOption.value, targetState);
                }}
                options={currencyData.map((item) => ({ value: item.currency, label: item.currency }))}
                className='select-input-token'
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        // backgroundColor: state.isFocused ? 'grey' : 'white',
                        borderColor: 'transparent',
                        borderRadius: '14px',
                        fontSize: '25px',
                        fontFamily: 'Helvetica',
                        fontWeight: 'bold',
                        color: '#1A3B4D',
                    }),
                    singleValue: (baseStyles) => ({
                        ...baseStyles,
                        color: 'primary',
                    }),
                }}
                components={{
                    IndicatorSeparator: () => null
                }}

            />
        </>
    );
};

export default SelectInputToken;
