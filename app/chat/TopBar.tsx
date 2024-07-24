import { Avatar, AvatarGroup, Flex, Img, Text } from "@chakra-ui/react";

function TopBar() {
    return (
        <Flex
            height={"60px"}
            w={"100%"}
            style={{
                background: "rgba(23, 23, 16, 0.49)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(5.8px)",
            }}
            px={"28px"}
            justifyContent={"space-between"}>
            <Flex alignItems={"center"} gap={"12px"}>
                <Img src="/icons/dots.svg" w={"30px"} height={"auto"} />
                <Text fontSize={"1.1rem"} color={"#B9B9B9"}>
                    {" "}
                    Live Chat Members{" "}
                </Text>
            </Flex>
            <Flex>
                <AvatarGroup max={3} size={"sm"}>
                    <Avatar name="Random" />
                    <Avatar name="Hello World" />
                    <Avatar name="Bella Cio" />
                    <Avatar name="Bella Cio" />
                </AvatarGroup>
            </Flex>
        </Flex>
    );
}

export default TopBar;
