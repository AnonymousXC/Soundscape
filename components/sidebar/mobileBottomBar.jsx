import { 
    Flex,
    Button,
    Image
} from "@chakra-ui/react"



const MobileBar = () => {
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
            <Button variant={"unstyled"} p={0}> <Image src="images/icons/Home Icon.svg" /> </Button>
            <Button variant={"unstyled"} p={0}> <Image src="images/icons/Liked Icon.svg" /> </Button>
            <Button variant={"unstyled"} p={0}> <Image src="images/icons/Non Fav Music Icon.svg" /> </Button>
            <Button variant={"unstyled"} p={0}> <Image src="images/icons/Setting Mob Icon.svg" /> </Button>
        </Flex>
    )
}


export default MobileBar