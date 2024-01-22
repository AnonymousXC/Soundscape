'use client'
import SearchResult from '@/components/SearchResult';
import SearchBar from '@/components/desktop/SongSearchBar';
import { SongResponse } from '@/interfaces/song.interface';
import {
    Flex,
} from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';

function Dashboard() {

    const query = useSearchParams().get('query')

    return (
        <Flex position={'relative'} top={0} left={0} width={'100%'} background={'background'} height={'calc(100vh - 6.25rem)'} px={'1.25rem'} pt={'1rem'} flexDir={'column'}>
            <SearchBar />
            {
                query != undefined ?
                <SearchResult query={query || ''} /> : 'Dashboard'
            }
        </Flex>
    )
}

export default Dashboard;