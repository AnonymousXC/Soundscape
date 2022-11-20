import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Button,
    Image,
    Flex
} from "@chakra-ui/react"


const SongDataModel = ({isOpenFun , onCloseFun, data}) => {

    return (
        <Modal isOpen={isOpenFun} onClose={onCloseFun}>
            <ModalOverlay />
            <ModalContent mx={3}>
                <ModalHeader>{data.songTitle}</ModalHeader>
                <ModalCloseButton />
                <ModalBody m={"0 auto"}>
                    <Flex justifyContent={"center"}>
                        <Image src={data.songImgUrl} rounded="5" w={"120px"} />
                    </Flex>
                    <Flex direction={"column"} pt={2} textAlign="center">
                        Name : {data.songTitle} <br />
                        Artist : {data.songArtist} <br />
                        Duration : {data.songDuration} <br />
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Flex w={"100%"} gap={2}>
                        <Button w={"50%"} colorScheme="teal"
                        onClick={() => {
                            shareCurrentSong(data.songID, data.songTitle)
                        }} >Share</Button>
                        <Button w={"50%"}
                        onClick={() => {
                            downloadCurrSong(data.playURL)
                        }} colorScheme="teal">Download</Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}


function shareCurrentSong(trackId, songTitle) {
    
    try {
        navigator.share({
            title: songTitle,
            text: "Listen it.",
            url: `${window.location.origin}/track/${trackId}`
        })
        return;
    } catch(err) {
        navigator.clipboard.writeText(`${window.location.origin}/track/${trackId}`)
        alert("Link Copied to Clipboard.")
    }
}

function downloadCurrSong(downloadURL) {
    var link = document.createElement("a");
    link.href = downloadURL;
    link.target = "_blank"
    document.body.appendChild(link);
    link.click();
    link.remove();
}


export default SongDataModel