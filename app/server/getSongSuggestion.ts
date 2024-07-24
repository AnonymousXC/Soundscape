"use server";

async function getSongSuggestions(id: string) {
    const fetchData = await fetch(
        process.env.MUSIC_API_URL_V2 + "/api/songs/" + id + "/suggestions",
        { cache: "no-cache" }
    );
    const data = await fetchData.json();
    const ids: string[] = [];
    if (data.data)
        data.data.forEach((el: any) => {
            ids.push(el.id);
        });
    return ids;
}

export default getSongSuggestions;
