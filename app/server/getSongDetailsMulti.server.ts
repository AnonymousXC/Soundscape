"use server";

async function getSongDetailsMulti(ids: any) {
    let idStr: string = ids.join(",");
    if (idStr.endsWith(",")) idStr = idStr.slice(0, -1);
    if (idStr.startsWith(",")) idStr = idStr.substring(1, idStr.length);
    const fetchData = await fetch(
        process.env.MUSIC_API_URL + "/songs?id=" + idStr,
        { cache: "force-cache" }
    );
    const data = await fetchData.json();
    console.log(data, idStr, ids);
    return data.data;
}

export default getSongDetailsMulti;
