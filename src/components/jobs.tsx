import React from 'react';
import { Stack } from '@chakra-ui/core';
import { useInfiniteQuery } from 'react-query';

interface JobsProps {
    search: string;
}

const Jobs: React.FC<JobsProps> = ({ search }) => {
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
            const res = await fetch(`/positions.json?markdown=true&page=${page}&search=${search}`, {
            });
            const data = await res.json();
            return { data, page: page + 1 };
        },
        {
            getFetchMore: lastGroup => lastGroup.page,
        }
    );

    return <div>jobs</div>;
}

export default Jobs;


