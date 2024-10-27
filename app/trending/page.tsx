"use client";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import getTrending from "../server/getTrending.server";
import { SongResponse } from "@/interfaces/song";
import Song from "@/components/global/SongBar";
import getSPlaylist from "../server/getPlaylist.server";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

function Trending() {
    let [current, setCurrent] = useState(0);
    const [trendingSongs, setTrendingSongs] = useState<SongResponse[]>();
    const [title, setTitle] = useState("");
    const [maxTiles, setTiles] = useState(0);

    useEffect(() => {
        (async () => {
            const charts = (await getTrending()).data.charts;
            const trendingSongs: SongResponse[] = (
                await getSPlaylist(charts[current].id)
            ).songs;
            if (trendingSongs.length > 0) {
                setTiles(charts.length);
                setTrendingSongs(trendingSongs);
                setTitle(charts[current].title);
            }
        })();
    }, [current]);

    if (
        trendingSongs === undefined ||
        trendingSongs?.length <= 0 ||
        title === ""
    )
        return (
            <Flex
                justifyContent={"center"}
                alignItems={"center"}
                height={"100%"}>
                <Text>Getting data from server...</Text>
            </Flex>
        );

    return (
        <Flex
            position={"relative"}
            top={0}
            left={0}
            width={"100%"}
            maxW={"100%"}
            background={"background"}
            height={"100%"}
            px={"1.25rem"}
            pt={"2rem"}
            flexDir={"column"}>
            <Heading size={"lg"} as={"h2"} paddingBottom={"1.25rem"}>
                {title}
            </Heading>
            <Flex flexDirection={"column"} gap={"0.4rem"} pb={"1rem"}>
                {trendingSongs !== undefined &&
                    trendingSongs.map((val: SongResponse, idx) => {
                        return <Song data={val} key={idx} />;
                    })}
            </Flex>
            <Flex
                width={"100%"}
                maxW={"sm"}
                justifyContent={"center"}
                bgColor={"#212121"}
                alignSelf={"center"}
                p={"0.75rem"}
                rounded={"full"}
                position={"fixed"}
                bottom={"120px"}
                zIndex={1000}>
                <Button
                    variant={"unstyled"}
                    onClick={() => {
                        if (current < maxTiles) setCurrent(current - 1);
                    }}>
                    <ArrowLeftIcon />
                </Button>
                <Flex flex={1} alignItems={"center"} px={"0.75rem"}>
                    {Array.from({ length: maxTiles }, (_, i) => i + 1).map(
                        (val, idx) => {
                            return (
                                <button
                                    className={
                                        idx === current ? "gradient-text" : ""
                                    }
                                    style={{
                                        flex: 1,
                                        textAlign: "center",
                                        fontWeight:
                                            idx === current ? "bold" : "normal",
                                        transition: "all 500ms",
                                    }}
                                    key={idx}
                                    onClick={() => {
                                        setCurrent(idx);
                                    }}>
                                    {val}
                                </button>
                            );
                        }
                    )}
                </Flex>
                <Button
                    variant={"unstyled"}
                    onClick={() => {
                        if (current > 0) setCurrent(current + 1);
                    }}>
                    <ArrowRightIcon />
                </Button>
            </Flex>
        </Flex>
    );
}

export default Trending;
