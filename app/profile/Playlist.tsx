import { Flex } from "@chakra-ui/react";
import AddPlaylistComp from "./AddPlaylistComp";
// import PlaylistBox from "./PlaylistBox";


function Playlist() {
    return (
        <Flex>
            {/* <PlaylistBox />
            <PlaylistBox />
            <PlaylistBox /> */}
            <AddPlaylistComp />
        </Flex>
    )
}

export default Playlist;