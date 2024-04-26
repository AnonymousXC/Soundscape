'use server'

async function search(query : string) {
    query = query.replaceAll(' ', '+')
    const fetchData = await fetch(process.env.MUSIC_API_URL + '/search/songs?query=' + query)
    const data = await fetchData.json()
    return data
}

export default search;