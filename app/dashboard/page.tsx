import SearchBar from '@/components/desktop/SongSearchBar';
import {
    Flex,
} from '@chakra-ui/react'

function Dashboard() {
    return (
        <Flex position={'relative'} top={0} left={0} width={'100%'} background={'background'} height={'calc(100vh - 6.25rem)'} px={'1.25rem'} pt={'1rem'}>
            <SearchBar />
        </Flex>
    )
}

export default Dashboard;