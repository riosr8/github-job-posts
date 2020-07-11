import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/core";

interface JobDetailsProps {
    id: string;
    onClose: any;
    isOpen: any;
}

const JobDetails: React.FC<JobDetailsProps> = ({ id, onClose, isOpen }) => {
    return (
        <Modal preserveScrollBarGap isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {id}
                </ModalBody>

                <ModalFooter>
                    <Button variantColor="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="ghost">Secondary Action</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default JobDetails;