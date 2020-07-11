import React from 'react';
import { Grid, Flex, Box, Input } from '@chakra-ui/core';
import { useInfiniteQuery } from 'react-query';

function App() {

  const [search, setSearch] = React.useState('');

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery<any, any, any>(
    ['jobs', { search }],
    async (key: string, { search }, page: number = 0) => {
      console.log(key, search, page)
      const res = await fetch(`/positions.json?page=${page}&search=${search}`, {
      });
      const data = await res.json();
      return { data, page: page + 1 };
    },
    {
      getFetchMore: lastGroup => lastGroup.page,
    }
  );

  return (
    <Grid w={'90%'} gridGap='20px' m='0 auto' templateColumns='3fr' templateRows='auto' templateAreas={`'header' 'content'`}>
      <Flex gridArea='header' h='10vh' alignItems='center'>
        <Input size='lg' borderWidth='3px' placeholder='Search...' />
      </Flex>
      <Box bg='#68d391' gridArea='content' h='100vh'>Content</Box>
    </Grid>

  );
}

export default App;
