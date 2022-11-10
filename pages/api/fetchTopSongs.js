


async function fetchTopSongs(req, res) {
    const playlistRes = await fetch("https://soundscape-backend-api.vercel.app/charts")
    const playlistData = await playlistRes.json()
    const playlistFetchDataRes = await fetch(`https://soundscape-backend-api.vercel.app/playlists?id=${playlistData.results[0].id}`)
    const playlistFetchData = await playlistFetchDataRes.json()
    res.status(200).json(playlistFetchData)
}

export default fetchTopSongs