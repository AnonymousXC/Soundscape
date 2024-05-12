'use server'
import { createClient } from "./supabase";

interface Props {
    name: string,
    author: string,
    folder: string,
    access: string
}

async function addPlaylist( { name, author, folder, access } : Props ) {
    const supabase = createClient()
    const userID = (await supabase.auth.getUser()).data.user?.id
    const status = await supabase.from('playlists').insert({
        details: {
            name,
            author,
            folder,
        },
        access: access,
        songs: {}
    })
    return status;
}


function randstr()
{
    return Math.random().toString(36);
}

export default addPlaylist;