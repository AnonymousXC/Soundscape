'use server'

async function getAlbum(id : string | string[]) {
    const fetchData = await fetch(process.env.MUSIC_API_URL + "/albums?id=" + id)
    const data = await fetchData.json()
    return data.data
}

export default getAlbum;