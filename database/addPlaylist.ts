'use server'
import PlaylistDetails from "@/@types/PlaylistDetail";
import { createClient } from "./supabase";
import { revalidatePath } from "next/cache";



async function addPlaylist( { name, author, folder, access, imageURL } : PlaylistDetails ) {
    const supabase = createClient()
    const status = await supabase.from('playlists').insert({
        details: {
            name,
            author,
            folder,
            imageURL,
        },
        access: access,
        songs: []
    })
    if(status.statusText === 'Created')
        revalidatePath('/profile')
    return status;
}


export default addPlaylist;