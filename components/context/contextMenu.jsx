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


const ContextMenu = () => {

    const [ display, setDisplay ] = useState("none")
    const [ menuPos, setMenuPos ] = useState({ x : 0, y : 0})
    const { isOpen, onOpen, onClose} = useDisclosure()
    const router = useRouter()
    
  useEffect(() => {

    document.body.addEventListener("contextmenu", (e) => {
      e.preventDefault()
      setDisplay("flex")
      setMenuPos({x : e.clientX, y : e.clientY })
      
    })

    document.body.addEventListener("click", (e) => {
        setDisplay("none")
    })

  }, [])

    return (
        <Flex 
        id="context-menu"
        w={"250px"}
        h={"280px"}
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
          <Button variant={"ghost"} roundedTop={0} justifyContent="flex-start" px={6}
          onClick={() => {
            router.back()
          }}>Back</Button>
          <OpenAudioQualityModal op={isOpen} cl={onClose}/>
        </Flex>
    )
}

const  OpenAudioQualityModal = ({op, cl}) => {
  return (
    <Modal isOpen={op} onClose={cl}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Audio Quality</ModalHeader>
        <ModalBody>
          Select Audio Quality : 
          <RadioGroup pt={2}>
            <Radio value={"1"} py={2}>Low (96 KBPS)</Radio> <br />
            <Radio value={"2"} py={2}>High (160 KBPS)</Radio> <br />
            <Radio value={"3"} py={2}>Extreme (320 KBPS)</Radio>
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