'use server'
import { createClient } from "./supabase";


async function addToFavourites(songID : string) {
    const supabase = createClient()
    const userID = (await supabase.auth.getUser()).data.user?.id
    const favArr : any = await (await supabase.from('favourites').select('*').eq('user_uuid', userID)).data
    let newSongs = favArr[0].songs
    let removed = false
    if(newSongs.indexOf(songID) === -1)
        newSongs.push(songID)
    else
    {
        removed = true
        newSongs.splice(newSongs.indexOf(songID), 1)
    }
    const status = await supabase.from('favourites').upsert({
        'user_uuid': userID,
        'songs': newSongs
    }).eq('user_uuid', userID)
    if(removed === true)
        {
            status.status = 300
            return status;
        }
    return status;
}

export default addToFavourites;