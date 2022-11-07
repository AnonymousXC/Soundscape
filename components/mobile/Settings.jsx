import {
    Flex,
    Button,
    Text,
    useDisclosure
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { OpenAudioQualityModal } from "../context/contextMenu"


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
        p={4}>
            <Text fontSize={"1.2rem"} fontWeight="500" mb={4}>Settings</Text>
            <Button w={"100%"} variant={"solid"} rounded={0}
            onClick={() => onOpen()}>
                Audio Quality
            </Button>
            <OpenAudioQualityModal op={isOpen} cl={onClose}/>
        </Flex>
    )
}


export default SettingTabMob