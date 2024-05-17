'use client'
import Love from "@/assets/icons/Love"
import Share from "@/assets/icons/Share"
import addToPlaylist from "@/database/addToPlaylist"
import getPlaylists from "@/database/getUserPlaylists"
import { AddIcon } from "@chakra-ui/icons"
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
            <Image loader={() => !playing ? '/icons/player/Play Light.svg' : '/icons/player/Pause Light.svg?'} src={!playing ? '/icons/player/Play Light.svg' : '/icons/player/Pause Light.svg '} width={17} height={17} alt='play-pause-btn' />
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

function AddToPlaylist({ id, playlist } : { id: string, playlist : any }) {

    return (
        <Menu>
            <MenuButton as={Button} variant={'unstyled'}>
                <AddIcon boxSize={'18px'} color={'#7A7A7A'} />
            </MenuButton>
            <MenuList>
                <MenuItem>Select a playlist</MenuItem>
                {
                    playlist?.map((el: any, idx: number) => {
                        return <MenuItem value={el.playlist_id} 
                                    onClick={async () => { 
                                        const status = await addToPlaylist(el.playlist_id, id) 
                                        if(status.statusText === 'Already exists')
                                            toast.warn(`Song already exists in ${el.details.name}`)
                                        else if(status.status === 204)
                                            toast.success(`Added song to playlist ${el.details.name}`)
                                        else
                                            toast.error("Error occured in the server")
                                    }} key={idx}> {el.details.name} </MenuItem>
                    })
                }
            </MenuList>
        </Menu>
    )
}

export { PlayButton, FavouriteButton, ShareButton, AddToPlaylist }