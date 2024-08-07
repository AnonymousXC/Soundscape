"use client";
import { Flex } from "@chakra-ui/react";
import TopBar from "./TopBar";
import MessageInputBox from "./MessageBox";
import useSocket from "./useSocket";
import { useEffect, useState } from "react";
import getSession from "@/database/session";
import { UserResponse } from "@supabase/supabase-js";
import Chats from "./Chats";

function Chat() {
    const socket = useSocket();
    const [user, setUser] = useState<UserResponse | undefined>();

    useEffect(() => {
        getSession().then((data: UserResponse) => {
            setUser(data);
        });
    }, []);

    return (
        <Flex
            position={"relative"}
            top={0}
            left={0}
            width={"100%"}
            background={"background"}
            height={[
                "calc(100vh - 3.875rem - 8.2rem - 3rem)",
                "calc(100vh - 3.875rem - 8.2rem - 3rem)",
                "calc(100vh - 6.25rem)",
            ]}
            flexDir={"column"}>
            <TopBar />
            <Chats socket={socket} />
            <MessageInputBox socket={socket} user={user} />
        </Flex>
    );
}

export default Chat;
