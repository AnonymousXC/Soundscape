import { Skeleton } from "@chakra-ui/react";


function SidebarFallback() {
    return (
        <Skeleton bgColor={'sidebarBG'} width={'100%'} maxWidth={'18.75rem'} height={'calc(100vh - 6.25rem)'} position={'relative'} top={0} left={0} zIndex={1000}>
        </Skeleton>
    )
}

export default SidebarFallback;