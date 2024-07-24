"use client";
import removeFromPlaylist from "@/database/removeFromPlaylist";
import { DeleteIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton } from "@chakra-ui/react";
import { toast } from "react-toastify";

function MenuBTN({ id, playlist_id }: { id: string; playlist_id: string }) {
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
                    toast.info("Removing from playlist");
                    const status = await removeFromPlaylist(playlist_id, id);
                    toast.success("Removed song successfully");
                }}>
                <DeleteIcon />
            </MenuButton>
        </Menu>
    );
}

export default MenuBTN;
