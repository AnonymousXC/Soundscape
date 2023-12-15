import {
    Text,
    Divider,
    Flex,
    useBreakpoint
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import SongInfoBar from '../home/songInfoBar';

function RecentPlayed() {

    const [cardsMetaArray, setCardsMetaArray] = useState<any>([])
    const currBR = useBreakpoint()
    const isMobile = currBR === "sm" || currBR === "base" ? true : false 

    useEffect(() => {

        let recentPlayedRawData = JSON.parse(localStorage.getItem("recent-played") || '[]')
        let recentPlayedSong : any = []
        recentPlayedRawData.forEach((el : any, idx : number) => {
            fetchSong(el.songID)
            .then((val : any) => {
                recentPlayedSong.push(
                <SongInfoBar 
                    key={idx}
                    songImage={val.image[2].link}
                    songTitle={val.name}
                    songPlayURL={val.downloadUrl[4].link}
                    artistName={val.primaryArtists}
                    songDuration={444}
                    songID={val.id}
                    card={true}/>
                )
            })
            setCardsMetaArray(recentPlayedSong)
        })
    }, [])

    return (
        <Flex height="max-content" pt={1}
            h={isMobile === true ? `calc(var(--mobile-height) - (90px + 48px + 50px))` : "calc(100% - 35px)"}
            px={3}
            py={3}
            pb={0}
            pr={0}
            direction={"column"}
            overflowY="auto">
            <Text fontSize={"1.2rem"} fontWeight="400">Recently Played</Text>
            <Divider />
            <Flex wrap={"wrap"} id="recent-played-cards-el" pt={2} overflowX={'hidden'}>
                {cardsMetaArray.length != 0 ? cardsMetaArray : <Loading />}
            </Flex>
        </Flex>
    )
}

const Loading = () => {
    return (
        <Flex h={"60vh"} w={"full"} justifyContent={"center"} alignItems={"center"}>
            <Text fontSize={"1.6rem"}>Loading...</Text>
        </Flex>
    )
}

async function fetchSong(id : string) {
    const rawData = await fetch(`${window.location.origin}/api/fetchSongData`, {
        body: JSON.stringify({
            songDataID : id,
        }),
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
    })
    const data = await rawData.json()
    return data;
}


export default RecentPlayed;