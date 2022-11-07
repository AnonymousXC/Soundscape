import { 
    Flex,
    Button,
    Image
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import SettingTabMob from "../mobile/Settings"



const MobileBar = () => {

    const router = useRouter()
    let [ songImgUrl, setSongImgURL] = useState("")
    const [ settingsDisplay, setSettingsDisplay ] = useState("none")

    useEffect(() => {
        setSongImgURL(JSON.parse(localStorage.getItem("last-played") || "{}").songImgUrl)

        document.body.addEventListener("contextmenu", (e) => {
            console.log(e.target);
        })

    }, [])

    return (
        <Flex 
        position={"fixed"}
        bottom={"0%"}
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
            <Button variant={"unstyled"} p={0} className="mobile-song-image" rounded={"full"}> <Image id="song-image" src={songImgUrl ? songImgUrl : "https://media.istockphoto.com/vectors/flag-ribbon-welcome-old-school-flag-banner-vector-id1223088904?k=20&m=1223088904&s=612x612&w=0&h=b_ilJpFTSQbZeCrZusHRLEskmfiONWH0hFASAJbgz9g="} m={"0 auto"} w={"40px"} h={"40px"} rounded={"full"} /> </Button>
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

        </Flex>
    )
}


export default MobileBar