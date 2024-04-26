'use server'


async function getArtistDetails(id : string) {
    const fetchData = await fetch(process.env.MUSIC_API_URL + "/artists?id=" + id)
    const data = await fetchData.json()
    return data
}

export default getArtistDetails;