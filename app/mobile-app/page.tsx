import { Flex, Heading } from "@chakra-ui/react";

function MobilePage() {
    return (
        <Flex
            position={"relative"}
            top={0}
            left={0}
            width={"100%"}
            px={12}
            my={6}
            flexDir={"column"}
            gap={6}
            background={"background"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"calc(100vh - 6.25rem)"}>
            <Heading size={"lg"}>In development</Heading>
        </Flex>
    );
}

export default MobilePage;
