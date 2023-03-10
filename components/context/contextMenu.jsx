import { useEffect, useState } from 'react'
import { 
    Flex,
    Button,
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    ModalBody,
    ModalFooter,
    RadioGroup,
    Radio
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { pushRecentPlayedToDB } from '../../.firebase/miscellaneous'
import toogleCurrTheme from "../../miscellaneous/toggleTheme"

const ContextMenu = () => {

    const [ display, setDisplay ] = useState("none")
    const [ menuPos, setMenuPos ] = useState({ x : 0, y : 0})
    const { isOpen, onOpen, onClose} = useDisclosure()
    let [ musicQuality, setMusicQuality ] = useState(4)
    const router = useRouter()
    
  useEffect(() => {

    document.body.addEventListener("contextmenu", (e) => {
      e.preventDefault()
      setDisplay("flex")
      setMenuPos({x : e.clientX, y : e.clientY })

      let musicQuality = localStorage.getItem("song-quality") || "4"
      setMusicQuality(musicQuality)
      
    })

    document.body.addEventListener("click", (e) => {
        setDisplay("none")
    })

  }, [])

    return (
        <Flex 
        id="context-menu"
        w={"250px"}
        h={"320px"}
        position="absolute"
        backgroundColor={"rgba(16, 20, 31, 1)"}
        display={display}
        zIndex={10}
        left={menuPos.x}
        top={menuPos.y}
        rounded={8}
        direction={"column"} >
          <Button variant={"ghost"} roundedBottom={0} justifyContent="flex-start" px={6}
          onClick={() => {
            router.push("/?tab=Home")
          }}>Home</Button>
          <Button variant={"ghost"} rounded={0} justifyContent="flex-start" px={6}>Playlists</Button>
          <Button variant={"ghost"} rounded={0} justifyContent="flex-start" px={6}>Library</Button>
          <Button variant={"ghost"} rounded={0} justifyContent="flex-start" px={6}
          onClick={() => {
            router.push("/?tab=Search")
          }}>Search</Button>
          <Button variant={"ghost"} rounded={0} justifyContent="flex-start" px={6} id="audio-btn"
          onClick={() => {onOpen()}}>Audio Quality</Button>
          <Button variant={"ghost"} rounded={0} justifyContent="flex-start" px={6}
          onClick={() => {
            router.reload()
          }}>Reload</Button>
          <Button variant={"ghost"} rounded={0} justifyContent="flex-start" px={6}
          onClick={() => {
            router.back()
          }}>Back</Button>
          <Button variant={"ghost"} roundedTop={0} justifyContent="flex-start" px={6}
          onClick={() => {
            toogleCurrTheme()            
          }}>Toggle Theme</Button>
          <OpenAudioQualityModal op={isOpen} cl={onClose} defVal={musicQuality}/>
        </Flex>
    )
}

const  OpenAudioQualityModal = ({op, cl, defVal}) => {
  return (
    <Modal isOpen={op} onClose={cl}
    onCloseComplete={() => {
      let quality = parseInt(localStorage.getItem("song-quality"))
      console.log(typeof quality);
      let recentPlays = JSON.parse(localStorage.getItem("recent-played"))
      recentPlays.forEach((elem, idx) => {
        if(quality === 0)
          elem.playURL = elem.playURL.replace(/\_.*/, "_12.mp4")
        else if(quality === 1)
          elem.playURL = elem.playURL.replace(/\_.*/, "_48.mp4")
        else if(quality === 2)
          elem.playURL = elem.playURL.replace(/\_.*/, "_96.mp4")
        else if(quality === 3)
          elem.playURL = elem.playURL.replace(/\_.*/, "_160.mp4")
        else if(quality === 4)
          elem.playURL = elem.playURL.replace(/\_.*/, "_320.mp4")

      })
      localStorage.setItem("recent-played", JSON.stringify(recentPlays))
      pushRecentPlayedToDB()
    }} isCentered>
      <ModalOverlay />
      <ModalContent mx={2}>
        <ModalHeader>Audio Quality</ModalHeader>
        <ModalBody>
          Select Audio Quality : 
          <RadioGroup pt={2} defaultValue={defVal}
          onChange={(e) => {
            localStorage.setItem("song-quality", e)
          }}>
            <Radio value={"0"} py={2}>Very Low (12 KBPS)</Radio> <br />
            <Radio value={"1"} py={2}>Low (48 KBPS)</Radio> <br />
            <Radio value={"2"} py={2}>Medium (96 KBPS)</Radio> <br />
            <Radio value={"3"} py={2}>High (160 KBPS)</Radio> <br />
            <Radio value={"4"} py={2}>Extreme (320 KBPS)</Radio>
          </RadioGroup>
        </ModalBody>
      <ModalFooter>
        <Button onClick={cl}>Close</Button>
      </ModalFooter>
      </ModalContent>
    </Modal>
  )

}


export default ContextMenu
export { OpenAudioQualityModal }