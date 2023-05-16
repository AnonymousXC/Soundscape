import {
    Box,
    Text,
    Divider,
    Flex
} from '@chakra-ui/react'
import { useState } from 'react';


function RecentPlayed() {

    const [ cardsMetaArray, setCardsMetaArray ] = useState([])

    return (
        <Box height="max-content" pt={1}>
            <Text fontSize={"1.2rem"} fontWeight="400">Recently Played</Text>
            <Divider />
            <Flex wrap={"wrap"} id="recent-played-cards-el" pt={2}>
                {cardsMetaArray}
            </Flex>
        </Box>
    )
}

export default RecentPlayed;