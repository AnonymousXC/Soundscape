'use client'

import { Flex } from "@chakra-ui/react";



function TopLoadingBar() {
    return (
        <Flex w={'100%'} height={'2px'} backgroundColor={'#fff'} position={'absolute'} top={0} left={0} zIndex={1001}>

        </Flex>
    )
}


export default TopLoadingBar;