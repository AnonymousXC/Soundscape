import { createClient } from "@/database/supabase";
import { Flex } from "@chakra-ui/react";
import RecentlyPlayed from "./RecentlyPlayed";
import Playlist from "./Playlist";
import SignUpPage from "../auth/page";
import dynamic from "next/dynamic";
import Loading from "../loading";

async function Profile() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();

    return (
        <Flex
            position={"relative"}
            top={0}
            left={0}
            width={"100%"}
            maxW={"100%"}
            background={"background"}
            height={"100%"}
            px={"1.25rem"}
            pt={["1rem", "3rem"]}
            flexDir={"column"}
            overflowY={"auto"}
            pb={2}>
            <Flex flexDirection={"column"} gap={6}>
                {data.user !== null && (
                    <>
                        <Playlist />
                        <RecentlyPlayed />
                    </>
                )}
                {data.user === null && <SignUpPage />}
            </Flex>
        </Flex>
    );
}

export default dynamic(() => Promise.resolve(Profile), {
    ssr: false,
    loading: () => {
        return <Loading />;
    },
});
