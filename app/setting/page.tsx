"use client";
import getPlaylists from "@/database/getUserPlaylists";
import Logout from "@/database/logout";
import getSession from "@/database/session";
import {
    Avatar,
    Box,
    Button,
    Flex,
    Heading,
    Input,
    Text,
    useToast,
} from "@chakra-ui/react";
import { PostgrestSingleResponse, UserResponse } from "@supabase/supabase-js";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PlaylistBox from "../profile/PlaylistBox";
import Link from "next/link";
import changeUsername from "@/database/changeUsername";
import changePassword from "@/database/changePassword";
import AddPlaylistComp from "../profile/AddPlaylistComp";
import usernameAlreadyExists from "@/database/usernameExists";

function Setting() {
    const songID = useSearchParams().get("id");
    const [user, setUser] = useState<UserResponse>();
    const [playlists, setPlaylist] = useState<PostgrestSingleResponse<any>>();
    const [loading, setLoading] = useState(true);
    const [newUsername, setUsername] = useState("");
    const [newPassword, setPassword] = useState("");
    const toast = useToast();

    useEffect(() => {
        (async () => {
            const user = getSession();
            const playlist = getPlaylists();
            const res = await Promise.all([user, playlist]);
            setUser(res[0]);
            setPlaylist(res[1]);
            setLoading(false);
        })();
    }, []);

    if (loading === false && user?.data.user !== null)
        return (
            <Flex
                position={"relative"}
                top={0}
                left={0}
                width={"100%"}
                background={"background"}
                px={6}
                py={6}
                gap={5}
                overflowY={"auto"}
                flexDir={"column"}
                height={"calc(100vh - 6.25rem)"}>
                <Flex py={4} gap={8} alignItems={"center"}>
                    <Avatar name="Hello World" size={"2xl"} />
                    <Flex flexDir={"column"} gap={3}>
                        <Heading size={"xl"}>
                            {" "}
                            Welcome, {
                                user?.data.user?.user_metadata.username
                            }{" "}
                        </Heading>
                        <Text> {user?.data.user?.email} </Text>
                    </Flex>
                </Flex>

                <Box>
                    <Heading mb={4} size={"lg"}>
                        Your playlists
                    </Heading>
                    <Flex
                        gap={4}
                        overflowX={"auto"}
                        overflowY={"hidden"}
                        className="hide-scroll-bar">
                        {playlists?.data &&
                            playlists.data.map((el: any, idx: number) => {
                                return (
                                    <PlaylistBox
                                        access={el.access}
                                        author={el.author}
                                        folder={el.details.folder}
                                        imageURL={el.details.imageURL}
                                        name={el.details.name}
                                        playlistId={el.playlist_id}
                                        songCount={el.songs.length}
                                        key={idx}
                                    />
                                );
                            })}
                        <AddPlaylistComp />
                    </Flex>
                </Box>

                <Box>
                    <Heading size={"lg"} my={4}>
                        Account settings
                    </Heading>
                    <Flex flexDirection={"column"} gap={4}>
                        <Flex
                            justifyContent={"center"}
                            alignItems={"center"}
                            gap={4}>
                            <Text minW={"120px"}>New username</Text>
                            <Input
                                flex={"1"}
                                borderBottom={"1px solid #fff"}
                                boxShadow={"none !important"}
                                roundedBottom={"0"}
                                borderTop={"none"}
                                borderLeft={"none"}
                                borderRight={"0"}
                                onChange={(e) => {
                                    setUsername(e.currentTarget.value);
                                }}
                            />
                            <Button
                                minW={"170px"}
                                onClick={async () => {
                                    toast({
                                        title: "Change username",
                                        status: "loading",
                                        duration: 4000,
                                        isClosable: false,
                                    });
                                    const { exists } =
                                        await usernameAlreadyExists(
                                            newUsername
                                        );
                                    if (exists === true) {
                                        toast({
                                            title: "Change username",
                                            description:
                                                "Username already exists.",
                                            status: "error",
                                            duration: 4000,
                                            isClosable: false,
                                        });
                                        return;
                                    }
                                    const message =
                                        await changeUsername(newUsername);
                                    toast({
                                        title:
                                            message?.error === false
                                                ? "Successful"
                                                : "Error",
                                        description: message?.message,
                                        status:
                                            message?.error === false
                                                ? "success"
                                                : "error",
                                        duration: 4000,
                                    });
                                    if (message?.error === false)
                                        location.reload();
                                }}
                                _hover={{
                                    backgroundImage:
                                        "linear-gradient(to right, #b5179e, #7209b7) !important",
                                    color: "#fff !important",
                                    fill: "white",
                                }}
                                transition={"all"}>
                                Change username
                            </Button>
                        </Flex>
                        <Flex
                            justifyContent={"center"}
                            alignItems={"center"}
                            gap={4}>
                            <Text minW={"120px"}>New email</Text>
                            <Input
                                flex={"1"}
                                borderBottom={"1px solid #fff"}
                                boxShadow={"none !important"}
                                roundedBottom={"0"}
                                borderTop={"none"}
                                borderLeft={"none"}
                                borderRight={"0"}
                            />
                            <Button
                                minW={"170px"}
                                _hover={{
                                    backgroundImage:
                                        "linear-gradient(to right, #b5179e, #7209b7) !important",
                                    color: "#fff !important",
                                    fill: "white",
                                }}
                                transition={"all"}>
                                Change email
                            </Button>
                        </Flex>
                        <Flex
                            justifyContent={"center"}
                            alignItems={"center"}
                            gap={4}
                            pb={4}>
                            <Text minW={"120px"}>New password</Text>
                            <Input
                                flex={"1"}
                                borderBottom={"1px solid #fff"}
                                boxShadow={"none !important"}
                                roundedBottom={"0"}
                                borderTop={"none"}
                                borderLeft={"none"}
                                borderRight={"0"}
                                onChange={(e) => {
                                    setPassword(e.currentTarget.value);
                                }}
                            />
                            <Button
                                minW={"170px"}
                                onClick={async () => {
                                    toast({
                                        title: "Changing password",
                                        status: "loading",
                                        duration: 4000,
                                        isClosable: false,
                                    });
                                    const message =
                                        await changePassword(newPassword);
                                    toast({
                                        title:
                                            message?.error === null
                                                ? "Successful"
                                                : "Error",
                                        description: message?.message,
                                        status:
                                            message?.error === null
                                                ? "success"
                                                : "error",
                                        duration: 4000,
                                    });
                                }}
                                _hover={{
                                    backgroundImage:
                                        "linear-gradient(to right, #b5179e, #7209b7) !important",
                                    color: "#fff !important",
                                    fill: "white",
                                }}
                                transition={"all"}>
                                Change password
                            </Button>
                        </Flex>
                        <Button
                            className="sidebar-active-tab"
                            onClick={() => {
                                Logout(songID || "");
                            }}>
                            Logout
                        </Button>
                        <Button
                            onClick={() => {
                                localStorage.removeItem("recents");
                                localStorage.removeItem("favourite");
                                localStorage.removeItem("chakra-ui-color-mode");
                                localStorage.removeItem("loop");
                            }}>
                            Clear Cache
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        );
    else if (loading === false && user?.data.user === null)
        return (
            <Flex
                position={"relative"}
                top={0}
                left={0}
                width={"100%"}
                maxW={"100%"}
                background={"background"}
                height={"calc(100vh - 6.25rem)"}
                px={"1.25rem"}
                pt={"1rem"}
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}>
                <Heading display={"flex"} gap={3}>
                    <Link href={"/login"}>
                        <Heading className="gradient-text">Sign in</Heading>
                    </Link>{" "}
                    to see your songs
                </Heading>
            </Flex>
        );
    return (
        <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
            Checking everything...
        </Flex>
    );
}

export default Setting;
