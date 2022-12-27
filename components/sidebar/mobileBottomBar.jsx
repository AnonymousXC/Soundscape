import { 
    Flex,
    Button,
    Image,
    useDisclosure
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import SettingTabMob from "../mobile/Settings"
import SongDataModel from "../mobile/SongDataModel"


const MobileBar = () => {

    const router = useRouter()
    let [ songImgUrl, setSongImgURL] = useState("")
    const [ settingsDisplay, setSettingsDisplay ] = useState("none")
    const { isOpen, onOpen ,onClose } = useDisclosure()
    const [ currSongData, setCurrentSongData ] = useState({})

    useEffect(() => {
        setSongImgURL(JSON.parse(localStorage.getItem("last-played") || "{}").songImgUrl)
    }, [])

    return (
        <Flex 
        position={"fixed"}
        bottom={"0% !important"}
        h={"50px"}
        w={"100%"}
        backgroundColor="#0B0F17"
        zIndex={5}
        justifyContent="space-around"
        alignItems={"center"}>
            <Button variant={"unstyled"} p={0}
            onClick={() => {
                if(settingsDisplay === "flex")
                    setSettingsDisplay("none")
                router.push("/?tab=Home", undefined, {shallow : true})
            }}> <Image src="images/icons/Home Icon.svg" m={"0 auto"} alt="" /> </Button>
            <Button variant={"unstyled"} p={0}
            onClick={() => {
                if(settingsDisplay === "flex")
                    setSettingsDisplay("none")
                router.push("/?tab=Search", undefined, {shallow : true})
            }}> <Image src="images/icons/Search Icon.svg" m={"0 auto"} alt="" /> </Button>
            <Button variant={"unstyled"} p={0} className="mobile-song-image songBarImage" rounded={"full"}> <Image id="song-image" src={songImgUrl ? songImgUrl : "https://media.istockphoto.com/vectors/flag-ribbon-welcome-old-school-flag-banner-vector-id1223088904?k=20&m=1223088904&s=612x612&w=0&h=b_ilJpFTSQbZeCrZusHRLEskmfiONWH0hFASAJbgz9g="} m={"0 auto"} w={"40px"} h={"40px"} rounded={"full"} alt=""
            onError={(e) => {
                e.currentTarget.src = "https://i.pinimg.com/originals/38/fd/ec/38fdec6bd4072081487b5aee95bec376.jpg"
            }}
            onClick={() => {
                setCurrentSongData(JSON.parse(document.getElementsByTagName("audio")[0].getAttribute("data-curr-song")))
                onOpen()
            }} /> </Button>
            <Button variant={"unstyled"} p={0}
            onClick={() => {
                if(settingsDisplay === "flex")
                    setSettingsDisplay("none")
                router.push("/?tab=LikedSong")
            }}> <Image src="images/icons/Non Fav Music Icon.svg" m={"0 auto"} alt="" /> </Button>
            <Button variant={"unstyled"} p={0}
            onClick={() => {
                setSettingsDisplay(settingsDisplay === "flex" ? "none" : "flex")
            }}> <Image src="images/icons/Setting Mob Icon.svg" m={"0 auto"} alt="" /> </Button>

            <SettingTabMob displayIt={settingsDisplay} />
            {/* Song Info Modal */}
            <SongDataModel isOpenFun={isOpen} onCloseFun={onClose} data={currSongData} />
        </Flex>
    )
}


export default MobileBar