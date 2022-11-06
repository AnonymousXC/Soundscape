



async function fetchSongByID(req, res) {
    let response = await fetch(`https://saavn.me/songs?id=${req.body.songID}`)
    let data = await response.json()
    res.status(200).json(data)
}