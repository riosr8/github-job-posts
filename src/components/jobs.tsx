import React from 'react';
import { Stack, Box, Flex } from '@chakra-ui/core';
import { useInfiniteQuery } from 'react-query';
import Job, { IJob } from './job';

interface JobsProps {
    search: string;
}

const Jobs: React.FC<JobsProps> = ({ search }) => {
    const {
        data,
        error,
        isLoading,
        isError,
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

    return (
        <Box>
            {
                isLoading ? (
                    <div>Loading...</div>
                ) : isError ? (
                    <div>Error...</div>
                ) : (
                            <Stack spacing={8}>
                                {
                                    data.map((page, i) => page.data.map((job: IJob) => (
                                        <Job key={`job-${job.id}`} {...job} />
                                    )))
                                }
                            </Stack>
                        )
            }
        </Box>
    );
}

export default Jobs;


