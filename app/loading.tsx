import { Flex } from "@chakra-ui/react";


function Loading() {
    return (
        <Flex justifyContent={'center'} alignItems={'center'} height={'100%'}>
            Fetching content...
        </Flex>
    )
}

export default Loading;