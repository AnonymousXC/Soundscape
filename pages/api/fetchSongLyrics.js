


async function fetchSongLyrics(req, res) {
    const dataRes = await fetch(`https://soundscape-backend-api.vercel.app/lyrics?id=${req.body.songID}`)
    const data = await dataRes.json()
    res.status(200).json(data)
}

export default fetchSongLyrics