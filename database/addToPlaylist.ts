"use server";

import { createClient } from "./supabase";

async function addToPlaylist(playlist_id: string, song_id: string) {
    const supabase = createClient();
    let prevArray = await (
        await supabase
            .from("playlists")
            .select("songs")
            .eq("playlist_id", playlist_id)
    ).data![0].songs;
    if (prevArray.indexOf(song_id) !== -1)
        return { status: 204, statusText: "Already exists" };
    else prevArray = [...prevArray, song_id];
    prevArray.sort();
    const status = await supabase
        .from("playlists")
        .update({
            songs: prevArray,
        })
        .eq("playlist_id", playlist_id);
    return status;
}

export default addToPlaylist;
