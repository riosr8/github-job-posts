import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, Flex, Box } from "@chakra-ui/core";
import { useQuery } from 'react-query';
import { IJob } from './job';
import ReactMarkdown from 'react-markdown';

interface JobDetailsProps {
    id: string;
    onClose: any;
    isOpen: any;
}

const JobDetails: React.FC<JobDetailsProps> = ({ id, onClose, isOpen }) => {

    const {
        isLoading, isError, data
    } = useQuery(
        ['job', id],
        async (key: string, id: string): Promise<IJob> => {
            try {
                const res = await fetch(`/positions/${id}.json?markdown=true`);
                return await res.json();
            } catch (error) {
                throw error
            }
        }
    )


    return (
        <Modal preserveScrollBarGap isOpen={isOpen} onClose={onClose} blockScrollOnMount>
            <ModalOverlay />
            <ModalContent>
                {
                    isLoading ?
                        'Loading...' :
                        isError ?
                            'Error' :
                            (
                                <>
                                    <ModalHeader>
                                        {data?.title}
                                        <Flex justifyContent='space-between'>
                                            <Text fontWeight='normal' fontSize='sm'>{data?.company}</Text>
                                            <Text fontWeight='normal' fontSize='sm'>{data?.location}/{data?.type}</Text>
                                        </Flex>
                                    </ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Box>
                                            <Text fontWeight='bold' textDecor='underline'>How to apply</Text>
                                            <ReactMarkdown source={data?.how_to_apply} />
                                        </Box>
                                        <Box>
                                            <Text fontWeight='bold' textDecor='underline'>Description</Text>
                                            <ReactMarkdown source={data?.description} />
                                        </Box>

                                    </ModalBody>
                                    <ModalFooter>
                                        <Button variantColor="blue" mr={3} onClick={onClose}>
                                            Close
                                        </Button>
                                    </ModalFooter>
                                </>
                            )
                }

            </ModalContent>
        </Modal>
    );
}

export default JobDetails;