"use server";

async function getTrending() {
    const fetchData = await fetch(
        process.env.MUSIC_API_URL + "/modules?language=english"
    );
    const data = await fetchData.json();
    return data;
}

export default getTrending;
