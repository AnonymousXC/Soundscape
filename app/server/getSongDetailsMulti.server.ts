"use server";

async function getSongDetailsMulti(ids: any) {
    const idStr = ids.join(",");
    const fetchData = await fetch(
        process.env.MUSIC_API_URL + "/songs?id=" + idStr,
        { cache: "force-cache" }
    );
    const data = await fetchData.json();
    return data.data;
}

export default getSongDetailsMulti;
