"use server";

import { createClient } from "./supabase";

async function getPlaylistSongs(id: string) {
    const supabase = createClient();
    const data = await supabase
        .from("playlists")
        .select("*")
        .eq("playlist_id", id);
    return data.data;
}

export default getPlaylistSongs;
