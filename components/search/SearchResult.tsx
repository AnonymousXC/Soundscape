"use client";
import { Flex, Text } from "@chakra-ui/react";
import Song from "../global/SongBar";
import { useEffect, useState } from "react";
import search from "@/app/server/search.server";
import { SongResponse } from "@/interfaces/song";

interface Props {
    query: string;
}

function SearchResult(props: Props) {
    const [songs, setSongs] = useState<Array<SongResponse>>([]);

    useEffect(() => {
        search(props.query).then((val) => {
            if (val.status == "SUCCESS") {
                setSongs(val.data.results);
            }
        });
    }, [props.query]);

    return (
        <Flex
            width={"100%"}
            mt={"1.5rem"}
            height={"100%"}
            overflowY={"auto"}
            flexDirection={"column"}
            gap={"0.4rem"}
            overflowX={"hidden"}
            className="hide-scroll-bar">
            {songs.length <= 0 && (
                <Text alignSelf={"center"}>Fetching songs...</Text>
            )}
            {songs.map((val, idx) => {
                return <Song data={val} key={idx} />;
            })}
        </Flex>
    );
}

export default SearchResult;
