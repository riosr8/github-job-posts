import React from 'react';
import { Box, Heading, PseudoBoxProps, Text, PseudoBox } from '@chakra-ui/core';

export interface IJob {
    id: string;
    type: string;
    created_at: string;
    company: string;
    company_url: string;
    location: string;
    title: string;
    description: string;
    how_to_apply: string;
    company_logo: string;
}

const Job: React.FC<IJob & PseudoBoxProps> = ({ title, company, ...rest }) => {
    return (
        <PseudoBox _hover={{ cursor: 'pointer', bg: 'gray.100' }} {...rest}>
            <Box p={5} shadow='md' borderWidth='1px' borderRadius='6px'>
                <Heading fontSize='xl'>{title}</Heading>
                <Text fontSize='lg'>{company}</Text>
            </Box>
        </PseudoBox>
    );
}

export default Job;