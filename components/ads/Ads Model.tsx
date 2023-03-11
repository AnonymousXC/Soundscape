import { NextComponentType } from "next";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Text
} from '@chakra-ui/react'
import { useEffect } from "react";

const Ads: NextComponentType = () => {

    const { isOpen, onClose, onOpen } = useDisclosure()

    useEffect(() => {
        onOpen()
    }, [])

    return (
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside' isCentered>
            <ModalOverlay />
            <ModalContent mx={2}>
                <ModalHeader>Ads</ModalHeader>
                <ModalBody>
                    <a href="https://dogeminingpaid.com/?ref=Thearcane..." target="_blank" rel="noreferrer">
                        <img src="https://dogeminingpaid.com/assets/banners/125.gif" />
                    </a>
                    <a href="https://dogeminingpaid.com/?ref=Thearcane..." target="_blank" rel="noreferrer">
                        <img src="https://dogeminingpaid.com/assets/banners/300.gif" />
                    </a>
                    <a href="https://dogeminingpaid.com/?ref=Thearcane..." target="_blank" rel="noreferrer">
                        <img src="https://dogeminingpaid.com/assets/banners/468.gif" />
                    </a>
                    <a href="https://dogeminingpaid.com/?ref=Thearcane..." target="_blank" rel="noreferrer">
                        <img src="https://dogeminingpaid.com/assets/banners/728.gif" />
                    </a>
                    <a href="https://dogeminingpaid.com/?ref=Thearcane..." target="_blank" rel="noreferrer">
                        <img src="https://dogeminingpaid.com/assets/banners/160.gif"/>
                    </a>
                </ModalBody>
                <ModalFooter display={'flex'} justifyContent='space-between'>
                    <Text>Contact <a href="https://discord.com/users/913777629142876200" style={{ color: 'tomato', cursor: 'pointer', fontWeight: 'bolder' }} target='_blank' rel="noreferrer">here</a> for ads</Text>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default Ads;