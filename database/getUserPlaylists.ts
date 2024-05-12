'use server'
import { createClient } from "./supabase";


async function getPlaylists() {
    const supabase = createClient()
    const userId = (await supabase.auth.getUser()).data.user?.id
    const playlists = await supabase.from('playlists').select('*').eq('user_id', userId)
    return playlists;
}

export default getPlaylists;