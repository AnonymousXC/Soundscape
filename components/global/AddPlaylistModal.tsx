import {
    Button,
    Flex,
    Img,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Skeleton,
    Text,
    useDisclosure
} from "@chakra-ui/react";

type Props = {
    isOpen: any,
    onClose: any,
    onOpen: any
}

function AddPlaylistModal({ isOpen, onOpen, onClose }: Props) {

    return (
        <Modal size={['sm', 'sm', 'xl']} isOpen={isOpen} onClose={onClose} isCentered={true} motionPreset="slideInBottom">
            <ModalOverlay bg='none' backdropFilter='auto' backdropInvert='80%' backdropBlur='2px' />
            <ModalContent bg={'Background'}>
                <ModalHeader>Add a new Playlist</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex gap={4} flexDirection={['column', 'column', 'row']}>
                        <Skeleton maxW={'210px'} h={'210px'}>
                            <Img w={'210px'} height={'210px'} />
                        </Skeleton>
                        <Flex flex={'1'} flexDir={'column'} gap={4}>
                            <Input size={'md'} placeholder="Enter playlist name" />
                            <Input size={'md'} placeholder="Enter author name" />
                            <Input size={'md'} placeholder="Add to folder" />
                            <Select placeholder="Select Access">
                                <option>Public</option>
                                <option>Private</option>
                            </Select>
                        </Flex>
                    </Flex>
                </ModalBody>
                <ModalFooter gap={5}>
                    <Button onClick={onClose} className="sidebar-active-tab" >
                        Create Playlist
                    </Button>
                    <Button onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddPlaylistModal;