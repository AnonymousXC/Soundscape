import {
    Box,
    Flex,
    Image,
    Heading,
    Text,
    useBreakpoint,
    Button,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"


const defaultSongServerObj = {
    album : {
        name : "Loading..."
    },
    releaseDate : "Loading...",
    playCount : "Loading...",
    duration : "Loading..."
}


const SongDetailDesk = () => {

    const [ songData, setSongData ] = useState({})
    const [ serverSongData, setServerSongData ] = useState(defaultSongServerObj)
    let [isPlaying, setIsPlaying] = useState(false)
    const [ lyrics, setLyrics ] = useState("Loading...")
    const currBR = useBreakpoint()
    const isMobile = currBR === "sm" || currBR === "base" ? true : false 
    let intl = Intl


    useEffect(() => {
        const audioData = sessionStorage.getItem("songClicked")
        const audioDataFromPlayer = JSON.parse(document.getElementsByTagName('audio')[0].getAttribute("data-curr-song"))
        
        if(audioDataFromPlayer.songID === JSON.parse(audioData).songID && document.getElementsByTagName('audio')[0].paused === false)
            setIsPlaying(true)

        document.getElementsByTagName('audio')[0].addEventListener("pause", (e) => {
            setIsPlaying(false)
        })

        document.getElementsByTagName('audio')[0].addEventListener("play", (e) => {
            if(audioDataFromPlayer.songID === JSON.parse(audioData).songID && document.getElementsByTagName('audio')[0].paused === false)
                setIsPlaying(true)
        })

        setSongData(JSON.parse(audioData))
        getSongDataServer(JSON.parse(audioData).songID)
        .then((e) => {
            setServerSongData(e)
        })
        getLyrics(JSON.parse(audioData).songID)
        .then(data => {
            data.results = data.results ? data.results : "Lyrics not found."
            setLyrics("<h1 style='font-weight: bold;font-size:18px;padding-bottom:8px;text-decoration:underline;'>Lyrics</h1>" + data.results)
        })

    }, []);

    function handlePlay() {
        if(isPlaying === true)
        {
            setIsPlaying(false)
            document.getElementsByTagName('audio')[0].pause();
        }
        else if(isPlaying === false)
        {
            if(JSON.parse(document.getElementsByTagName('audio')[0].getAttribute("data-curr-song")).songID === JSON.parse(sessionStorage.getItem("songClicked")).songID)
            {
                setIsPlaying(true)
                document.getElementsByTagName('audio')[0].play()
            }
            else
            {
                setIsPlaying(true)
                let audioData = JSON.parse(sessionStorage.getItem("songClicked"))
                let musicDataToSave = {
                    "songImgUrl" : audioData.songImage,
                    "songTitle" : audioData.songTitle,
                    "songDuration" : audioData.songDuration,
                    "songArtist" : audioData.artistName,
                    "playURL" : audioData.playURL,
                    "songID" : audioData.songID
                }
                document.getElementsByTagName('audio')[0].src = audioData.songPlayURL;
                document.getElementById("song-image").src = audioData.songImage;
                document.getElementById("song-name").innerText = audioData.songTitle;
                document.getElementById("artist-name").innerText = audioData.artistName;

                navigator.mediaSession.metadata = new MediaMetadata({
                    title: audioData.songTitle,
                    artist: audioData.artistName,
                    artwork: [
                        {src: audioData.songImage, sizes:"500x500", type: 'image/png'}
                    ]
                })

                document.getElementsByTagName('audio')[0].play()
                document.getElementsByTagName('audio')[0].setAttribute('data-curr-song', JSON.stringify(musicDataToSave))
            }
        }
    }

    return (
        <Flex
        h={isMobile ? "calc(var(--mobile-height) - 188px)" : "100%"}
        pt={4}
        overflowY="auto"
        direction="column">
            <Flex 
            p={isMobile ? 4 : 8}
            w={"100%"}
            h={isMobile ? "unset" : "50%"}
            alignItems={"center"}
            direction={isMobile === true ? "column" : "row"}>
                {
                    isMobile === true &&
                    <Flex justifyContent={"center"} alignItems="center" direction={"column"} h={"315px"}>
                        <Image src={songData.songImage} h={"250px"} w="auto" rounded={6}
                        onError={(e) => {
                            e.currentTarget.src = "https://i.pinimg.com/originals/38/fd/ec/38fdec6bd4072081487b5aee95bec376.jpg"
                        }} />
                        <Button 
                        pt={1}
                        onClick={handlePlay}
                        position={"relative"}
                        variant="unstyled">
                            <Image src={isPlaying === true ? "images/icons/Play Music Icon.svg" :  "images/icons/Pause Music Icon.svg"} w={"50px"} />
                        </Button>
                    </Flex>
                }
                {
                    isMobile === false &&
                    <Image src={songData.songImage} h={"250px"} w="auto" rounded={6}
                    onError={(e) => {
                        e.currentTarget.src = "https://i.pinimg.com/originals/38/fd/ec/38fdec6bd4072081487b5aee95bec376.jpg"
                    }} />
                }
                <Box
                minH={"max-content"}
                pt={isMobile ? 2 : 0}
                w={isMobile ? "250px" : "initial"}
                px={isMobile ? 0 : 4}>
                    <Heading>{songData.songTitle}</Heading>
                    <Text color="#B0B0B0" pt={2}> <span style={{ color: "#747474" }}>Artist</span> {songData.artistName}</Text>
                    {
                        isMobile === true && 
                        <>
                            <Text color="#B0B0B0" pt={0}> <span style={{ color: "#747474" }}>Album</span> {serverSongData.album.name ? serverSongData.album.name : "Loading..."}</Text>
                            <Text color="#B0B0B0" pt={0}> <span style={{ color: "#747474" }}>Date Added</span> {serverSongData.releaseDate}</Text>
                            <Text color="#B0B0B0" pt={0}> <span style={{ color: "#747474" }}>Duration</span> {(serverSongData.duration)}</Text>
                            <Text color="#B0B0B0" pt={0}> <span style={{ color: "#747474" }}>Play Count</span> {intl.NumberFormat().format(serverSongData.playCount)}</Text>
                        </>
                    }
                    {
                        isMobile === false &&
                        <Button 
                        onClick={handlePlay}
                        variant="unstyled">
                            <Image src={isPlaying === true ? "images/icons/Play Music Icon.svg" :  "images/icons/Pause Music Icon.svg"} w={"50px"} />
                        </Button>
                    }
                </Box>
            </Flex>
            {
                isMobile === false &&
                <Flex
                pt={4}
                px={8}
                h={"100px"}
                w={"100%"}>
                    <Flex justifyContent={"space-between"} w={"100%"} h="25px" direction={"column"}>
                            <Flex justifyContent={"space-between"}>
                                <Box>
                                    <Text>Name</Text>
                                    <Text color="#B0B0B0" pt={1}>{serverSongData.name}</Text>
                                </Box>
                                <Box>
                                    <Text>Artist</Text>
                                    <Text color="#B0B0B0" pt={1}>{serverSongData.primaryArtists}</Text>
                                </Box>
                                <Box>
                                    <Text>Album</Text>
                                    <Text color="#B0B0B0" pt={1}> {serverSongData.album.name ? serverSongData.album.name : "Loading..."}</Text>
                                </Box>
                                {/* <Box>
                                    <Text>Added Date</Text>
                                    <Text color="#B0B0B0" pt={1}>{serverSongData.releaseDate}</Text>
                                </Box> */}
                                <Box>
                                    <Text>Duration</Text>
                                    <Text color="#B0B0B0" pt={1}>{serverSongData.duration}</Text>
                                </Box>
                                <Box>
                                    <Text>Play Count</Text>
                                    <Text color="#B0B0B0" pt={1}>{intl.NumberFormat().format(serverSongData.playCount)}</Text>
                                </Box>
                            </Flex>
                    </Flex>
                </Flex>
            }
            <Text dangerouslySetInnerHTML={{__html: lyrics}}
            mt={isMobile === false ? "60px" : "10px"}
            mx={8}></Text>
        </Flex>
    )
}


async function getSongDataServer(songID) {
    let queryed = await fetch(`${window.location.origin}/api/fetchSongData`, {
        body: JSON.stringify({
            songDataID : songID,
        }),
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
    })

    let data = await queryed.json()
    const dateObj = new Date(data.duration *1000)
    let durationStr = dateObj.getUTCMinutes() + ":" + dateObj.getSeconds()
    data.duration = durationStr
    return data

}

async function getLyrics(sID) {
    const resData = await fetch("api/fetchSongLyrics", {
        body: JSON.stringify({
            songID: sID,
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const lyrics = await resData.json()
    return lyrics;
}




export default SongDetailDesk;
export { getSongDataServer }