"use client";
import SearchResult from "@/components/search/SearchResult";
import SearchBar from "@/components/desktop/SongSearchBar";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import Genre from "./Genre";
import TopMusic from "./TopMusic";

function Dashboard() {
    const [query, setQuery] = useState<string>();
    const [visibility, setVisibility] = useState(false);

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
            pt={"1rem"}
            flexDir={"column"}
            overflowY={"auto"}
            overflowX={"hidden"}
            pb={4}>
            <SearchBar
                setQueryParent={setQuery}
                setResultsVisibilityParent={setVisibility}
                isResultsOpen={visibility}
                currentQuery={query || ""}
            />
            {visibility == true ? (
                <SearchResult query={query || ""} />
            ) : (
                <DB_Dashboard />
            )}
        </Flex>
    );
}

function DB_Dashboard() {
    return (
        <>
            <Genre />
            <TopMusic />
        </>
    );
}

export default Dashboard;
