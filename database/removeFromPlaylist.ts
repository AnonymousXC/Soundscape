'use server'

import { revalidateTag } from "next/cache";
import { createClient } from "./supabase";

async function removeFromPlaylist(playlist_id: string, song_id: string) {
    const supabase = createClient()
    let prevArray = await (await supabase.from('playlists').select('songs').eq('playlist_id', playlist_id)).data![0].songs
    let idx = prevArray.indexOf(song_id)
    if(idx !== -1)
    {
        prevArray.splice(idx, 1)
    }
    const status = await supabase.from('playlists').update({
        songs: prevArray,
    }).eq('playlist_id', playlist_id)
    revalidateTag('/playlist')
    return status;
}

export default removeFromPlaylist;