'use client'

import { Progress } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

let startLoading = () => {}

function TopLoadingBar() {
    
    const [ isLoading, setIsLoading] = useState<boolean>(true)
    const pathname = usePathname()

    useEffect(() => {
        setIsLoading(false)
    }, [pathname])

    startLoading = () => {
        if(isLoading == false)
            setIsLoading(true)
    }

    return <Progress w={'100%'} position={'absolute'} top={0} left={0} hidden={!isLoading} isIndeterminate={isLoading} height={'3px'} zIndex={1001} className="sidebar-active-tab" colorScheme="black" />
}


export default TopLoadingBar;
export { startLoading };