"use client";
import removeFromPlaylist from "@/database/removeFromPlaylist";
import { DeleteIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, useToast } from "@chakra-ui/react";

function MenuBTN({ id, playlist_id }: { id: string; playlist_id: string }) {
    const toast = useToast();

    return (
        <Menu>
            <MenuButton
                as={Button}
                variant={"unstyled"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                _hover={{
                    backgroundColor: "red",
                }}
                onClick={async () => {
                    toast({
                        title: "Playlist",
                        description: "Removing from playlist",
                        duration: 4000,
                        isClosable: false,
                        status: "info",
                    });
                    const status = await removeFromPlaylist(playlist_id, id);
                    toast({
                        title: "Playlist",
                        description: "Removed song successfully",
                        duration: 4000,
                        isClosable: false,
                        status: "success",
                    });
                }}>
                <DeleteIcon />
            </MenuButton>
        </Menu>
    );
}

export default MenuBTN;
