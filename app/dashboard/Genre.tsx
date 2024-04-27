import { Image } from "@chakra-ui/next-js";
import { 
    Box,
    Flex,
    Text
} from "@chakra-ui/react";
import GenreBox from "./GenreBox";


function Genre() {
    return (
        <Flex mt={"1rem"} flexDirection={'column'} mb={5}>
            <Flex alignItems={'center'} gap={"0.5rem"}>
                <Image src={'icons/Music icon.svg'} width={6} height={6} alt="music" />
                <Text color={'primaryText'} fontWeight={'500'} fontSize={"1.2rem"}>
                    Discover Genre
                </Text>
            </Flex>
            <Flex gap={4} overflowX={'auto'} mt={3} className="hide-scroll-bar">
                <GenreBox />
                <GenreBox />
                <GenreBox />
                <GenreBox />
                <GenreBox />
                <GenreBox />
            </Flex>
        </Flex>
    )
}

export default Genre;