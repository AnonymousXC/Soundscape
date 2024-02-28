'use client'
import { Flex } from "@chakra-ui/react";
import Song from "./SearchSongBar";
import { useEffect, useState } from "react";
import search from "@/app/actions/search.server";
import { SongResponse } from "@/interfaces/song.interface";

interface Props {
    query: string
}

function SearchResult(props : Props) {

    const [ songs, setSongs ] = useState<Array<SongResponse>>([])

    useEffect(() => {
        search(props.query)
        .then((val) => {
            if(val.status == 'SUCCESS')
            {
                setSongs(val.data.results)
                console.log(songs)
            }
        })
    }, [props.query])

    return (
        <Flex width={'100%'} mt={'1.5rem'} height={'100%'} overflowY={'auto'} flexDirection={'column'} gap={'0.4rem'}>
            {
                songs.map((val, idx) => {
                    return <Song data={val} key={idx} />
                })
            }
        </Flex>
    )
}

export default SearchResult