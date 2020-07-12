import React from 'react';
import { Stack, Box, useDisclosure, PseudoBox } from '@chakra-ui/core';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import Job, { IJob } from './job';
import JobDetails from './job-details';

interface JobsProps {
    search: string;
}

const Jobs: React.FC<JobsProps> = ({ search }) => {
    const {
        data,
        isLoading,
        isError,
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
            getFetchMore: lastGroup => (lastGroup.data.length !== 0 ? lastGroup.page : false),
        }
    );

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [jobId, setJobId] = React.useState('');
    const [ref, inView] = useInView({
        /* Optional options */
        threshold: 0,
    })

    React.useEffect(() => {
        if (inView) {
            fetchMore();
        }
    }, [inView, fetchMore])

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
                                        <Job
                                            key={`job-${job.id}`}
                                            onClick={() => {
                                                setJobId(job.id);
                                                onOpen();
                                            }}
                                            {...job}
                                        />
                                    )))
                                }
                            </Stack>
                        )
            }
            {
                jobId ? <JobDetails id={jobId} isOpen={isOpen} onClose={onClose} /> : null
            }
            <PseudoBox ref={ref} onClick={() => { fetchMore() }}>
                {
                    isLoading ? '' :
                        isFetchingMore ?
                            'Fetching More' :
                            canFetchMore ?
                                'Fetch More' :
                                'Nothing more to fetch'

                }
            </PseudoBox>
        </Box>
    );
}

export default Jobs;


