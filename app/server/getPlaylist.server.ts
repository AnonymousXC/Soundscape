"use server";

async function getSPlaylist(id: string | string[]) {
    const fetchData = await fetch(
        process.env.MUSIC_API_URL + "/playlists?id=" + id,
        { cache: "force-cache" }
    );
    const data = await fetchData.json();
    return data.data;
}

export default getSPlaylist;
