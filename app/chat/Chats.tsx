import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { createRef, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

type Props = {
    socket: Socket | undefined;
};

interface MessageData {
    message: string;
    username: string;
}

function Chats({ socket }: Props) {
    const [messages, setMessages] = useState<Array<MessageData>>([]);
    const scrollRef = createRef<HTMLDivElement>();

    useEffect(() => {
        socket?.on("global-receive-message", (data: MessageData) => {
            setMessages((val) => [...val, data]);
            scrollRef.current?.scrollIntoView();
        });

        return () => {
            socket?.off("receive-message");
        };
    }, [socket]);

    return (
        <Flex
            flex={"1"}
            flexDir={"column"}
            px={8}
            overflowY={"auto"}
            gap={14}
            py={4}>
            {messages.map((value: MessageData, idx: number) => (
                <ChatMessage data={value} key={idx} />
            ))}
            <Box ref={scrollRef}></Box>
        </Flex>
    );
}

function ChatMessage({ data }: { data: MessageData }) {
    return (
        <Flex gap={5} alignItems={"center"}>
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
            <Flex flexDir={"column"} gap={2}>
                <Flex flex={1} gap={2} alignItems={"end"} height={"28px"}>
                    <Text fontSize={"1.1rem"} fontWeight={"500"}>
                        {data.username}
                    </Text>
                    <Text fontSize={"10px"} pb={1} fontWeight={"300"}>
                        Now at {(new Date().getHours() + "").padStart(2, "0")}.
                        {(new Date().getMinutes() + "").padStart(2, "0")}
                    </Text>
                </Flex>
                <Box
                    backgroundColor={"#1D1D1D"}
                    w={"max-content"}
                    maxW={["100%", "100%", "600px"]}
                    px={5}
                    py={2}
                    fontSize={"0.9rem"}
                    roundedBottom={"0.5rem"}
                    roundedTopEnd={"0.5rem"}>
                    {data.message}
                </Box>
            </Flex>
        </Flex>
    );
}

export default Chats;
