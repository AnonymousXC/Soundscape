'use client'
import { Flex } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";



function TopLoadingBar() {
    
    const pathname = useSearchParams()
    const searchParams = useSearchParams()
    
    useEffect(() => {
        console.log("Route change started")
        
    }, [pathname, searchParams])

    return (
        <Flex w={'100%'} height={'2px'} backgroundColor={'#fff'} position={'absolute'} top={0} left={0} zIndex={1001}>
        </Flex>
    )
}


export default TopLoadingBar;