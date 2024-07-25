import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { createRef, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

type Props = {
    socket: Socket | undefined;
};

interface MessageData {
    message: string;
    username: string;
    id: string;
}

function Chats({ socket }: Props) {
    const [messages, setMessages] = useState<Array<MessageData>>([]);

    useEffect(() => {
        socket?.on("global-receive-message", (data: MessageData) => {
            setMessages((val) => [...val, data]);
            const chatOverflowBox = document.getElementById(
                "chat-content"
            ) as HTMLDivElement;
            chatOverflowBox.scrollTo({
                top: chatOverflowBox.scrollHeight + chatOverflowBox.scrollTop,
                behavior: "smooth",
            });
        });

        return () => {
            socket?.off("receive-message");
        };
    }, [socket]);

    return (
        <Flex
            id={"chat-content"}
            flex={"1"}
            flexDir={"column"}
            px={8}
            py={4}
            overflowY={"auto"}
            overflowX={"hidden"}>
            {messages.map((value: MessageData, idx: number) => (
                <ChatMessage
                    data={value}
                    key={idx}
                    isSelf={socket?.id === value.id}
                />
            ))}
            <Box></Box>
        </Flex>
    );
}

function ChatMessage({ data, isSelf }: { data: MessageData; isSelf: boolean }) {
    return (
        <Flex
            gap={4}
            alignItems={"center"}
            my={5}
            flexDir={isSelf ? "row-reverse" : "row"}>
            <Flex
                className="sidebar-active-tab"
                width={35}
                height={35}
                rounded={"full"}
                justifyContent={"center"}
                alignItems={"center"}>
                <Avatar
                    name={data.username}
                    size={"sm"}
                    borderColor={".sidebar-active-tab"}
                />
            </Flex>
            <Flex
                flexDir={"column"}
                gap={1}
                maxW={"100%"}
                alignItems={isSelf ? "end" : "start"}>
                <Flex flex={1} gap={2} alignItems={"end"} height={"28px"}>
                    <Text
                        fontSize={"1.1rem"}
                        fontWeight={"500"}
                        cursor={isSelf ? "default" : "pointer"}
                        _hover={
                            !isSelf
                                ? {
                                      textDecoration: "underline",
                                      textUnderlineOffset: 4,
                                  }
                                : {}
                        }>
                        {data.username}
                    </Text>
                    <Text
                        fontSize={"10px"}
                        pb={1}
                        fontWeight={"300"}
                        display={isSelf ? "none" : "block"}>
                        Now at {(new Date().getHours() + "").padStart(2, "0")}.
                        {(new Date().getMinutes() + "").padStart(2, "0")}
                    </Text>
                </Flex>
                <Text
                    backgroundColor={"#1D1D1D"}
                    w={"min-content"}
                    maxW={["90%", "90%", "500px"]}
                    px={5}
                    py={2}
                    fontSize={"0.9rem"}
                    roundedBottom={"0.5rem"}
                    roundedTopStart={isSelf ? "0.5rem" : "0rem"}
                    roundedTopEnd={isSelf ? "0rem" : "0.5rem"}>
                    {data.message}
                </Text>
            </Flex>
        </Flex>
    );
}

export default Chats;
