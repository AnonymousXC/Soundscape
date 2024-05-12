'use server'
import PlaylistDetails from "@/@types/PlaylistDetail.type";
import { createClient } from "./supabase";



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
    return status;
}


export default addPlaylist;