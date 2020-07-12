import React from 'react';
import { CircularProgress, Flex } from "@chakra-ui/core"

const Loading = () => {
    return (
        <Flex h='60vh' justifyContent='center' alignItems='center'>
            <CircularProgress size='200px' isIndeterminate color='blue'></CircularProgress>
        </Flex>

    )
}

export default Loading;