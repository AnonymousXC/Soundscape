import { Image } from "@chakra-ui/next-js";
import { 
    Flex,
    Text
} from "@chakra-ui/react";


function Genre() {
    return (
        <Flex mt={"1rem"} flexDirection={'column'}>
            <Flex alignItems={'center'} gap={"0.5rem"}>
                <Image src={'icons/Music icon.svg'} width={6} height={6} alt="music" />
                <Text color={'primaryText'} fontWeight={'500'} fontSize={"1.2rem"}>
                    Discover Genre
                </Text>
            </Flex>
            Card
        </Flex>
    )
}

export default Genre;