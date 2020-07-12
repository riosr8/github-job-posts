import React from 'react';
import { Stack, Box, useDisclosure, Button } from '@chakra-ui/core';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import Job, { IJob } from './job';
import JobDetails from './job-details';
import Loading from './loading';

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
            const nextPage = data.length !== 0 ? page + 1 : null;
            return { data, page: nextPage };
        },
        {
            getFetchMore: lastGroup => lastGroup.page,
        }
    );

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [jobId, setJobId] = React.useState('');
    const [ref, inView] = useInView({
        /* Optional options */
        threshold: 0,
    })

    React.useEffect(() => {
        if (inView && canFetchMore) {
            fetchMore();
        }
    }, [inView, fetchMore, canFetchMore])

    return (
        <Box mb={4}>
            {
                isLoading ? (
                    <Loading />
                ) : isError ? (
                    <div>Error...</div>
                ) : (
                            <>
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
                                {
                                    jobId ?
                                        <JobDetails id={jobId} isOpen={isOpen} onClose={() => { setJobId(''); onClose(); }} /> : null
                                }
                                <Button variant='ghost' mt='1em' w='100%' ref={ref} onClick={() => { if (canFetchMore) { fetchMore() } }}>
                                    {
                                        isLoading ? '' :
                                            isFetchingMore ?
                                                'Fetching More' :
                                                canFetchMore ?
                                                    'Fetch More' :
                                                    'No results returned'

                                    }
                                </Button>
                            </>
                        )
            }

        </Box>
    );
}

export default Jobs;


