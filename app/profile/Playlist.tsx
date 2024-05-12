'use client'
import { Flex } from "@chakra-ui/react";
import AddPlaylistComp from "./AddPlaylistComp";
import { useEffect, useState } from "react";
import getPlaylists from "@/database/getUserPlaylists";


function Playlist() {

    const [ playlistData, setPlaylistData ] = useState<any>([])

    useEffect(() => {
        (async () => {
            let playlists = await getPlaylists()
            setPlaylistData(playlists.data)
            console.log(playlists)
        })()
    }, [])

    return (
        <Flex gap={4} overflowX={'auto'} className="hide-scroll-bar" py={3}>
            {
                playlistData &&
                playlistData.map((el : any, idx : number) => {
                    return <p>
                        {el.playlist_id}
                    </p>
                })
            }
            <AddPlaylistComp />
        </Flex>
    )
}

export default Playlist;