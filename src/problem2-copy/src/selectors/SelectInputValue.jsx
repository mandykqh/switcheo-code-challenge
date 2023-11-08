import React from 'react';
import { Input } from '@chakra-ui/react'
import '../styles/styles.css'

const SelectInputValue = ({ value, valueInput, targetState }) => {
    return (
        <div>
            <Input className='select-input-value'
                style={{ width: Math.min(Math.max(value.length, 2), 20) + 'ch' }}
                p='0'
                placeholder='0'
                name='valueInput'
                maxW='200px'
                fontSize='30px'
                textStyle="h1"
                color="primary"
                border='none' value={value}
                onChange={e => valueInput(e.target.value, targetState)} />
        </div>
    );
};

export default SelectInputValue;