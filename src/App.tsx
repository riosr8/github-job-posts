import React from 'react';
import { Grid, Flex, Box, Input } from '@chakra-ui/core';
import Jobs from './components/jobs';

function App() {

  const [search, setSearch] = React.useState('');

  return (
    <Grid w={'90%'} gridGap='20px' m='0 auto' templateColumns='3fr' templateRows='auto' templateAreas={`'header' 'content'`}>
      <Flex gridArea='header' h='10vh' alignItems='center'>
        <Input
          size='lg'
          borderWidth='3px'
          placeholder='Search...'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        />
      </Flex>
      <Box bg='#68d391' gridArea='content' h='100vh'>
        <Jobs search={search} />
      </Box>
    </Grid>

  );
}

export default App;
