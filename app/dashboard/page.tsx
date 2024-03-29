'use client'
import SearchResult from '@/components/SearchResult';
import SearchBar from '@/components/desktop/SongSearchBar';
import {
    Flex,
} from '@chakra-ui/react';
import { useState } from 'react';
import Genre from './Genre';
import TopMusic from './TopMusic';

function Dashboard() {

    const [ query, setQuery ] = useState<string>()
    const [ visibility, setVisibility ] = useState(false)

    return (
        <Flex position={'relative'} top={0} left={0} width={'100%'} background={'background'} height={'calc(100vh - 6.25rem)'} px={'1.25rem'} pt={'1rem'} flexDir={'column'}>
            <SearchBar setQueryParent={setQuery} setResultsVisibilityParent={setVisibility} isResultsOpen={visibility} currentQuery={query || ''} />
            {
                visibility == true ?
                <SearchResult query={query || ''} /> : <DB_Dashboard />
            }
        </Flex>
    )
}

function DB_Dashboard() {
    return (
        <>
            <Genre />
            <TopMusic />
        </>
    )
}

export default Dashboard;