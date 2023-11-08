import React from 'react';
import { Input } from '@chakra-ui/react'
import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'
import '../styles/styles.css'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(inputAnatomy.keys)

const xl = defineStyle({
    fontSize: 'lg',
    px: '6',
    h: '12',
})

const sizes = {
    xl: definePartsStyle({ field: xl, addon: xl }),
}

export const inputTheme = defineMultiStyleConfig({ sizes })

const SelectInputValue = ({ value, valueInput, targetState }) => {
    return (
        <div>
            <Input style={{ width: Math.min(Math.max(value.length, 2), 20) + 'ch' }} p='0' className='select-input-value' placeholder='0' name='valueInput' maxW='200px' size='lg' fontSize='30px' textStyle="h1"
                color="primary" border='none' value={value}
                onChange={e => valueInput(e.target.value, targetState)} />
        </div>
    );
};

export default SelectInputValue;