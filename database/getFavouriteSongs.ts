'use server'

import { createClient } from "./supabase";

async function getFavouriteSongs() {
    const supabase = createClient()
    const id = (await supabase.auth.getUser()).data.user?.id
    const data = await supabase.from('favourites').select('*').eq('user_uuid', id)
    console.log(data)
    return data.data
}

export default getFavouriteSongs;