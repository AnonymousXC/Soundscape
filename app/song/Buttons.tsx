'use client'
import Love from "@/assets/icons/Love"
import Share from "@/assets/icons/Share"
import addToPlaylist from "@/database/addToPlaylist"
import getPlaylists from "@/database/getUserPlaylists"
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

function PlayButton({ searchParams, id }: any) {

    const router = useRouter()
    const playing = searchParams.id === id && searchParams.paused !== '1'

    const handlePlay = (e: any) => {
        e.stopPropagation()
        const url = new URL(location.href)

        if (url.searchParams.get('id') == id) {
            const audio = document.querySelector('audio')
            if (audio?.paused == true)
                audio?.play()
            else
                audio?.pause()
            return
        }

        if (url.searchParams.get('id'))
            url.searchParams.set('id', id || '')
        else
            url.searchParams.append('id', id || '')
        router.replace(url.toString())
    }

    return (
        <Button variant={'unstyled'} p={2} onClick={handlePlay}>
            <Image loader={() => !playing ? '/icons/player/Play.svg' : '/icons/player/Pause.svg?'} src={!playing ? '/icons/player/Play.svg' : '/icons/player/Pause.svg '} width={17} height={17} alt='play-pause-btn' />
        </Button>
    )
}

function FavouriteButton() {
    return (
        <Button variant={'unstyled'}>
            <Love isActive={false} />
        </Button>
    )
}

function ShareButton() {
    return (
        <Button variant={'unstyled'}>
            <Share />
        </Button>
    )
}

function AddToPlaylist({ id } : { id: string }) {

    const [playlist, setPlaylist] = useState<Array<any>>()

    useEffect(() => {
        (async () => {
            const data = await getPlaylists()
            // @ts-expect-error
            setPlaylist(data.data)
            console.log(data)
        })()
    }, [])

    return (
        <Menu>
            <MenuButton as={Button}>
                Add to Playlist
            </MenuButton>
            <MenuList>
                {
                    playlist?.map((el: any, idx: number) => {
                        return <MenuItem value={el.playlist_id} 
                                    onClick={async () => { 
                                        const status = await addToPlaylist(el.playlist_id, id) 
                                        if(status.status === 204)
                                            toast.success(`Added song to playlist ${el.details.name}`)
                                        else
                                            toast.error("Error occured in the server")
                                    }}> {el.details.name} </MenuItem>
                    })
                }
            </MenuList>
        </Menu>
    )
}

export { PlayButton, FavouriteButton, ShareButton, AddToPlaylist }