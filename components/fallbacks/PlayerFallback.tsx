import { Skeleton } from "@chakra-ui/react";


function PlayerFallback() {
    return (
        <Skeleton width={'100vw'} height={'6.25rem'} position={'absolute'} bottom={0} left={0} zIndex={10000}>
        </Skeleton>
    )
}

export default PlayerFallback;