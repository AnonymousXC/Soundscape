"use client";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import AddPlaylistModal from "@/components/global/AddPlaylistModal";

function AddPlaylistComp() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <AddPlaylistModal
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
            />
            <Flex
                cursor={"pointer"}
                justifyContent={"center"}
                alignItems={"center"}
                minW={240}
                minH={270}
                flexDir={"column"}
                position={"relative"}
                float={"left"}
                _hover={{ transform: "scale(1.02)" }}
                transition={"transform 200ms"}
                backgroundColor={"rgba(0,0,0,0.5)"}
                rounded={20}
                onClick={onOpen}>
                <Flex flexDir={"column"} alignItems={"center"} gap={5}>
                    <AddIcon boxSize={"2.5rem"} />
                    <Text>Add a new Playlist</Text>
                </Flex>
            </Flex>
        </>
    );
}

export default AddPlaylistComp;
