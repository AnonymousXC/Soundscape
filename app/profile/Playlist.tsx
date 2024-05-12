'use client'
import { Flex } from "@chakra-ui/react";
import AddPlaylistComp from "./AddPlaylistComp";
import { useEffect, useState } from "react";
import getPlaylists from "@/database/getUserPlaylists";
import PlaylistBox from "./PlaylistBox";


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
                    console.log(el)
                    return <PlaylistBox 
                            access={el.access} 
                            author={el.author} 
                            folder={el.details.folder} 
                            imageURL={el.details.imageURL}
                            name={el.details.name}
                            playlistId={el.playlist_id}
                            songCount={el.songs.length}
                            key={idx} />
                })
            }
            <AddPlaylistComp />
        </Flex>
    )
}

export default Playlist;