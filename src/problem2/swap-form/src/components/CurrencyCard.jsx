import React from 'react';
import { FormControl, FormLabel, Input, FormHelperText, Card, CardBody, Text } from '@chakra-ui/react'

const CurrencyCard = () => {
    return (
        <Card>
            <FormControl>
                <FormLabel>You Send</FormLabel>
                <Input type='amount to send' />
            </FormControl>
        </Card>
    );
};

export default CurrencyCard;