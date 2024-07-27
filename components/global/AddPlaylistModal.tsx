import addPlaylist from "@/database/addPlaylist";
import getSession from "@/database/session";
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
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

type Props = {
    isOpen: any;
    onClose: any;
    onOpen: any;
};

function AddPlaylistModal({ isOpen, onOpen, onClose }: Props) {
    const [playlistName, setPlaylistName] = useState("");
    const [folder, setFolder] = useState("");
    const [access, setAccess] = useState<"public" | "private">("public");
    const [username, setUsername] = useState("");
    const [imageURL, setImageURL] = useState(
        "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3"
    );
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    useEffect(() => {
        (async () => {
            const username = (await getSession()).data.user?.user_metadata
                .username;
            setUsername(username);
        })();
    }, []);

    return (
        <Modal
            size={["sm", "sm", "xl"]}
            isOpen={isOpen}
            onClose={onClose}
            isCentered={true}
            motionPreset="slideInBottom">
            <ModalOverlay
                bg="none"
                backdropFilter="auto"
                backdropInvert="80%"
                backdropBlur="2px"
                zIndex={500}
            />
            <ModalContent bg={"Background"}>
                <ModalHeader>Add a new Playlist</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex gap={4} flexDirection={["column", "column", "row"]}>
                        <Img
                            w={"210px"}
                            height={"210px"}
                            src={imageURL}
                            backgroundSize={"cover"}
                            rounded={8}
                            display={["none", "none", "block"]}
                        />
                        <Flex flex={"1"} flexDir={"column"} gap={4}>
                            <Input
                                size={"md"}
                                placeholder="Enter playlist name"
                                onChange={(e) =>
                                    setPlaylistName(e.currentTarget.value)
                                }
                            />
                            <Input
                                size={"md"}
                                placeholder="Enter author name"
                                value={username}
                                readOnly
                            />
                            <Input
                                size={"md"}
                                placeholder="Add to folder"
                                onChange={(e) =>
                                    setFolder(e.currentTarget.value)
                                }
                            />
                            <Select
                                placeholder="Select Access"
                                value={access}
                                onChange={(e) =>
                                    setAccess(
                                        e.currentTarget.value == "public"
                                            ? "public"
                                            : "private"
                                    )
                                }>
                                <option value={"public"}>Public</option>
                                <option value={"private"}>Private</option>
                            </Select>
                        </Flex>
                    </Flex>
                </ModalBody>
                <ModalFooter gap={5}>
                    <Button
                        onClick={async () => {
                            if (!playlistName) {
                                toast({
                                    title: "Playlist",
                                    description: `Error creating playlist. Provide a name.`,
                                    duration: 4000,
                                    isClosable: false,
                                    status: "error",
                                });
                                return;
                            }

                            setLoading(true);
                            const status = await addPlaylist({
                                name: playlistName,
                                folder,
                                access,
                                author: username,
                                imageURL,
                            });
                            if (status!.statusText === "Created")
                                toast({
                                    title: "Playlist",
                                    description: `${playlistName} created successfully`,
                                    duration: 4000,
                                    isClosable: false,
                                    status: "success",
                                });
                            else
                                toast({
                                    title: "Playlist",
                                    description: `Error creating playlist ${playlistName}`,
                                    duration: 4000,
                                    isClosable: false,
                                    status: "error",
                                });
                            setLoading(false);
                        }}
                        className="sidebar-active-tab"
                        isLoading={loading}>
                        Create Playlist
                    </Button>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default AddPlaylistModal;
