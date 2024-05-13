import addPlaylist from "@/database/addPlaylist";
import getSession from "@/database/session";
import {
    Button,
    Flex,
    Img,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
    isOpen: any,
    onClose: any,
    onOpen: any
}

function AddPlaylistModal({ isOpen, onOpen, onClose }: Props) {

    const [ playlistName, setPlaylistName ] = useState("")
    const [ folder, setFolder ] = useState("")
    const [ access, setAccess ] = useState<"public" | "private">("public")
    const [ username, setUsername ] = useState("")
    const [ imageURL, setImageURL ] = useState("https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3")
    const [ loading, setLoading ] = useState(false)
    
    useEffect(() => {
        (async () => {
            const username = (await getSession()).data.user?.user_metadata.username
            setUsername(username)
        })()
    }, [])

    return (
        <Modal size={['sm', 'sm', 'xl']} isOpen={isOpen} onClose={onClose} isCentered={true} motionPreset="slideInBottom">
            <ModalOverlay bg='none' backdropFilter='auto' backdropInvert='80%' backdropBlur='2px' />
            <ModalContent bg={'Background'}>
                <ModalHeader>Add a new Playlist</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex gap={4} flexDirection={['column', 'column', 'row']}>
                            <Img w={'210px'} height={'210px'} src={imageURL} backgroundSize={'cover'} rounded={8} />
                        <Flex flex={'1'} flexDir={'column'} gap={4}>
                            <Input size={'md'} placeholder="Enter playlist name" onChange={(e) => setPlaylistName(e.currentTarget.value)} />
                            <Input size={'md'} placeholder="Enter author name" value={username} readOnly />
                            <Input size={'md'} placeholder="Add to folder" onChange={(e) => setFolder(e.currentTarget.value)} />
                            <Select placeholder="Select Access" value={access} onChange={(e) => setAccess(e.currentTarget.value == "public" ? "public" : 'private')}>
                                <option value={'public'}>Public</option>
                                <option value={'private'}>Private</option>
                            </Select>
                        </Flex>
                    </Flex>
                </ModalBody>
                <ModalFooter gap={5}>
                    <Button onClick={async () => {
                        setLoading(true)
                        const status = await addPlaylist({name: playlistName, folder,access, author: username, imageURL })
                        if(status!.statusText === 'Created')
                            toast.success(`${playlistName} created successfully`)
                        else
                            toast.error(`Error creating playlist ${playlistName}`)
                        setLoading(false)
                    }} className="sidebar-active-tab" isLoading={loading} >
                        Create Playlist
                    </Button>
                    <Button onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddPlaylistModal;