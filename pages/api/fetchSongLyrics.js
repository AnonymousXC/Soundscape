


async function fetchSongLyrics(req, res) {
    const dataRes = await fetch(`https://soundscape-backend-api.vercel.app/lyrics?id=${req.body.songID}`)
    const data = await dataRes.json()
    let returning = {}
    if(data.data === null || !data.data)
        returning.lyrics = "Lyrics Not Found."
    else
        returning.lyrics = data.data.lyrics;
    res.status(200).json(returning)
}

export default fetchSongLyrics