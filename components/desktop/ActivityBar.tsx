"use client";
import {
    Avatar,
    Button,
    Flex,
    Heading,
    Skeleton,
    Text,
} from "@chakra-ui/react";
import { Img } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Artist from "../global/Artist";
import RecentlyPlayedSong from "./RecentlyPlayedSideBar";
import getSession from "@/database/session";
import { User, UserResponse } from "@supabase/supabase-js";
import getFavouriteSongs from "@/database/getFavouriteSongs";
import { usePathname, useRouter } from "next/navigation";

function ActivityBar() {
    const [isVisible, setVisibility] = useState<boolean>(true);
    const [recents, setRecents] = useState<Array<string>>([]);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const path = usePathname();
    const router = useRouter();

    useEffect(() => {
        getSession().then((data: UserResponse) => {
            setUser(data.data.user);
        });
        getFavouriteSongs().then((data) => {
            if (data && data.length !== 0) setRecents(data![0].songs || []);
            setLoading(false);
        });
    }, [path]);

    const handleRouteChange = (path: string) => {
        const url = new URL(window.location.href);
        router.push(path + "?" + url.searchParams.toString());
    };

    return (
        <Flex
            display={["none", "none", "flex"]}
            bgColor={"background"}
            width={isVisible ? "100%" : "0px"}
            maxWidth={"21.875rem"}
            height={"calc(100vh - 6.25rem)"}
            flexDirection={"column"}
            px={isVisible ? "1.75rem" : "0px"}
            pt={"1.875rem"}
            position={"relative"}
            top={0}
            left={0}
            boxShadow={"1px 3px 25px rgb(0 0 0 / 0.8)"}
            zIndex={500}
            transition={"all 200ms"}>
            <Button
                position={"absolute"}
                rounded={0}
                top={"0%"}
                right={"0px"}
                px={0}
                height={"100%"}
                opacity={0}
                onClick={() => {
                    setVisibility(!isVisible);
                }}
                _hover={{ opacity: 1 }}>
                {isVisible ? "→" : "←"}
            </Button>
            {user !== null && loading === false && (
                <Flex
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    mb={"1.875rem"}>
                    <Flex gap={"0.625rem"}>
                        <Avatar name={user?.user_metadata.username} />
                        <Flex flexDirection={"column"}>
                            <Text
                                color={"primaryTextRe"}
                                fontSize={"1.188rem"}
                                fontWeight={500}>
                                {" "}
                                {user?.user_metadata.username ||
                                    "Anonymous"}{" "}
                            </Text>
                            <Text color={"primaryText"} fontSize={"0.75rem"}>
                                {" "}
                                {user?.email || "sign in"}{" "}
                            </Text>
                        </Flex>
                    </Flex>
                    <Button
                        variant={"unstyled"}
                        justifyContent={"flex-end"}
                        display={"flex"}>
                        <Img
                            src="/icons/Notification.svg"
                            width={"25px"}
                            height={"auto"}
                        />
                    </Button>
                </Flex>
            )}
            <Flex
                flexDirection={"column"}
                overflow={"auto"}
                className="hide-scroll-bar"
                flex={"1"}>
                {/* <Flex flexDirection={"column"}>
                    <Text
                        color={"primaryText"}
                        fontSize={"1.188rem"}
                        fontWeight={500}>
                        Top Artist
                    </Text>
                    <Flex
                        flexDirection={"column"}
                        gap={"0.75rem"}
                        mt={"1.25rem"}>
                        <Artist id={"568707"} visible={isVisible} />
                        <Artist id={"599452"} visible={isVisible} />
                        <Artist id={"755042"} visible={isVisible} />
                        <Artist id={"1274170"} visible={isVisible} />
                        <Artist id={"615155"} visible={isVisible} />
                    </Flex>
                </Flex> */}
                {recents.length > 0 && loading === false && (
                    <Flex flexDirection={"column"} pb={"2.5rem"}>
                        <Text
                            color={"primaryText"}
                            fontSize={"1.188rem"}
                            fontWeight={500}>
                            Favourite Songs
                        </Text>
                        <Flex
                            flexDirection={"column"}
                            gap={"0.75rem"}
                            mt={"1.25rem"}>
                            {recents.map((el: string, idx: number) => {
                                if (idx < 11)
                                    return (
                                        <RecentlyPlayedSong
                                            id={el}
                                            visible={isVisible}
                                            key={idx}
                                        />
                                    );
                            })}
                            <Button
                                variant={"unstyled"}
                                fontSize={"0.8rem"}
                                fontWeight={"400"}
                                className="gradient-text"
                                alignSelf={"end"}
                                width={"min-content"}
                                onClick={() => {
                                    handleRouteChange("/favorite");
                                }}>
                                See more &gt;&gt;
                            </Button>
                        </Flex>
                    </Flex>
                )}
                {user === null && loading === false && (
                    <Flex
                        flex={"1"}
                        justifyContent={"center"}
                        alignItems={"center"}>
                        <Text
                            userSelect={"none"}
                            fontWeight={"600"}
                            fontSize={"1.2rem"}>
                            <span
                                className="gradient-text"
                                style={{
                                    fontWeight: "600",
                                    fontSize: "1.2rem",
                                }}>
                                Sign in
                            </span>{" "}
                            to view content
                        </Text>
                    </Flex>
                )}
                {loading === true && (
                    <Flex
                        flex={"1"}
                        justifyContent={"center"}
                        alignItems={"center"}>
                        <Heading
                            size={"md"}
                            className="gradient-text"
                            userSelect={"none"}>
                            Loading...
                        </Heading>
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
}

export default ActivityBar;
