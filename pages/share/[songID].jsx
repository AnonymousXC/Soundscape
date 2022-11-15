import {
    Flex
} from "@chakra-ui/react"
import { useRouter } from "next/router"


const SharePage = () => {

    const router = useRouter()
    const currSongID = router.query.songID

    return (
        <Flex>
            Working on it.
        </Flex>
    )
}

export default SharePage