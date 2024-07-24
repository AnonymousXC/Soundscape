import { Button, Flex, Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { cache, useEffect, useState } from "react";
import getTrending from "../server/getTrending.server";
import Song from "@/components/global/SongBar";
import { SongResponse } from "@/interfaces/song";
import { useRouter } from "next/navigation";

const topSongsCache = cache(getTrending);

function TopMusic() {
    let [trendingSongs, setTrendingSongs] =
        useState<Array<SongResponse> | null>([]);
    const router = useRouter();

    const handleRouteChange = (path: string) => {
        const url = new URL(window.location.href);
        router.push(path + "?" + url.searchParams.toString());
    };

    useEffect(() => {
        (async () => {
            const data = await topSongsCache();
            setTrendingSongs(data.data.trending.songs);
        })();

        return () => {
            trendingSongs = null;
        };
    }, []);

    return (
        <Flex mt={"1rem"} flexDirection={"column"}>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Flex gap={"0.5rem"} alignItems={"center"}>
                    <Image
                        src={"icons/Headphone icon.svg"}
                        width={6}
                        height={6}
                        alt="music"
                    />
                    <Text
                        color={"primaryText"}
                        fontWeight={"500"}
                        fontSize={"1.2rem"}>
                        Top Music
                    </Text>
                </Flex>
                <Button
                    variant={"unstyled"}
                    fontSize={"0.8rem"}
                    fontWeight={"400"}
                    className="gradient-text"
                    onClick={() => {
                        handleRouteChange("/trending");
                    }}>
                    Show more &gt;&gt;
                </Button>
            </Flex>
            <Flex
                width={"100%"}
                mt={"1.5rem"}
                height={"100%"}
                overflowY={"hidden"}
                flexDirection={"column"}
                gap={"0.4rem"}
                overflowX={"hidden"}
                className="hide-scroll-bar"
                px={1}>
                {trendingSongs !== null &&
                    trendingSongs.map((val: SongResponse, idx: number) => {
                        return <Song data={val} key={idx} />;
                    })}
                {trendingSongs?.length === 0 && (
                    <Flex
                        justifyContent={"center"}
                        alignItems={"center"}
                        height={"100%"}
                        width={"100%"}>
                        Getting data from server...
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
}

export default TopMusic;
