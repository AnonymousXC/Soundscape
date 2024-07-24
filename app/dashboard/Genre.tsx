import { Image } from "@chakra-ui/next-js";
import { Box, Flex, Text } from "@chakra-ui/react";
import GenreBox from "./GenreBox";
import getTrending from "../server/getTrending.server";
import { cache, useEffect, useState } from "react";

const getTrendingCache = cache(getTrending);

function Genre() {
    const [albums, setAlbums] = useState<Array<any>>([]);

    useEffect(() => {
        getTrendingCache().then((data) => {
            setAlbums(data.data.trending.albums);
        });
    }, []);

    return (
        <Flex mt={"1rem"} flexDirection={"column"} mb={5}>
            <Flex alignItems={"center"} gap={"0.5rem"}>
                <Image
                    src={"icons/Music icon.svg"}
                    width={6}
                    height={6}
                    alt="music"
                />
                <Text
                    color={"primaryText"}
                    fontWeight={"500"}
                    fontSize={"1.2rem"}>
                    Discover Genre
                </Text>
            </Flex>
            <Flex
                gap={4}
                overflowX={"auto"}
                className="hide-scroll-bar"
                py={3}
                minH={270}>
                {albums.map((element: any, idx: number) => {
                    return <GenreBox props={element} key={idx} />;
                })}
                {albums.length === 0 && (
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

export default Genre;
