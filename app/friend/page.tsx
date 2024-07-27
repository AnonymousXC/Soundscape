import { Flex, Heading, Input, Text } from "@chakra-ui/react";

function Friend() {
    return <Text>Hello world</Text>;

    return (
        <Flex
            position={"relative"}
            top={0}
            left={0}
            width={"100%"}
            flexDirection={"column"}
            p={6}
            gap={5}
            background={"background"}
            height={"100%"}>
            <Input
                placeholder="Search a username"
                width={"100%"}
                height={"2.8rem"}
                rounded={"40px"}
                boxShadow={"none !important"}
                backgroundColor={"rgba(65,65,65,0.65)"}
                border={"none"}
                color={"primaryText"}
                _placeholder={{ color: "primaryText" }}
            />
            <Flex>
                <Heading size={"lg"}>Your friends</Heading>
            </Flex>
        </Flex>
    );
}

export default Friend;
