import { 
    Flex,
    Button,
    Image
} from "@chakra-ui/react"
import { useRouter } from "next/router"



const MobileBar = () => {

    const router = useRouter()

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
                router.push("/?tab=Home", undefined, {shallow : true})
            }}> <Image src="images/icons/Home Icon.svg" m={"0 auto"} /> </Button>
            <Button variant={"unstyled"} p={0}
            onClick={() => {
                router.push("/?tab=Search", undefined, {shallow : true})
            }}> <Image src="images/icons/Search Icon.svg" m={"0 auto"} /> </Button>
            <Button variant={"unstyled"} p={0} className="mobile-song-image" rounded={"full"}> <Image id="song-image" src="" m={"0 auto"} w={"40px"} h={"40px"} rounded={"full"} /> </Button>
            <Button variant={"unstyled"} p={0}> <Image src="images/icons/Non Fav Music Icon.svg" m={"0 auto"} /> </Button>
            <Button variant={"unstyled"} p={0}> <Image src="images/icons/Setting Mob Icon.svg" m={"0 auto"} /> </Button>
        </Flex>
    )
}


export default MobileBar