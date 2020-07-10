import React from 'react';
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
    <div>
      <button onClick={() => fetchMore()}>fetch more</button>
    </div>
  );
}

export default App;
