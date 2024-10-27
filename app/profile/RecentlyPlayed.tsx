"use client";
import Song from "@/components/global/SongBar";
import { SongResponse } from "@/interfaces/song";
import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import getSongDetailsMulti from "../server/getSongDetailsMulti.server";

function RecentlyPlayed() {
    const [songsData, setSongsData] = useState<Array<SongResponse>>();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("recents") || "[]");
        if (data.length > 0)
            getSongDetailsMulti(data).then((data) => {
                if (!songsData) setSongsData(data);
            });
    }, [songsData]);

    return (
        <Flex width={"full"} flexDir={"column"} gap={6}>
            <Text color={"primaryText"} fontWeight={"500"} fontSize={"1.2rem"}>
                Recently Played
            </Text>
            <Flex gap={2} flexDirection={"column"}>
                {songsData?.map((el: SongResponse, idx: number) => {
                    return <Song data={el} key={idx} />;
                })}
            </Flex>
        </Flex>
    );
}

export default RecentlyPlayed;
