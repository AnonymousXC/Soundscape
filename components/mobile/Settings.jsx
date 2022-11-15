import {
    Flex,
    Button,
    Text,
    useDisclosure
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { OpenAudioQualityModal } from "../context/contextMenu"
import toogleCurrTheme from "../../miscellaneous/toggleTheme"


const SettingTabMob = ({displayIt}) => {

    const { isOpen, onClose, onOpen} = useDisclosure()
    const [ innerHeight, setInnerHeight ] = useState()

    useEffect(() => {
        setInnerHeight(window.innerHeight)
    }, [])

    return (
        <Flex 
        display={displayIt}
        position={"fixed"}
        top={"0px"}
        h={`calc(${innerHeight}px - 48px)`}
        w={"100%"}
        backgroundColor={"#10141f"}
        direction={"column"}
        p={4}
        gap={3}>
            <Text fontSize={"1.2rem"} fontWeight="500" mb={4}>Settings</Text>
            <Button w={"100%"} variant={"solid"} rounded={0}
            onClick={() => onOpen()}>
                Audio Quality
            </Button>
            <Button w={"100%"} variant="solid" rounded={0}
            onClick={() => {
                localStorage.removeItem("recent-played")
                localStorage.removeItem("Fav-Arr")
                localStorage.removeItem("song-quality")
            }}>Clear All Data</Button>
            <Button w={"100%"} variant="solid" rounded={0}
            onClick={() => {
                toogleCurrTheme()
            }}>
                Toggle Theme
            </Button>
            <Button w={"100%"} variant="solid" rounded={0}
            onClick={() => {
                router.push("/signup")
            }}>
                Sign Up
            </Button>
            <Button w={"100%"} variant="solid" rounded={0}
            onClick={() => {
                router.push("/login")
            }}>
                Login
            </Button>
            <Button w={"100%"} variant="solid" rounded={0}
            onClick={() => {
                localStorage.removeItem("userID")
            }}>
                Logout
            </Button>
            <OpenAudioQualityModal op={isOpen} cl={onClose}/>
        </Flex>
    )
}


export default SettingTabMob