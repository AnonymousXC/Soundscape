'use server'

async function getSongDetails(id : string) {
    const fetchData = await fetch(process.env.MUSIC_API_URL + "/songs?id=" + id)
    const data = await fetchData.json()
    return data
}

export default getSongDetails;