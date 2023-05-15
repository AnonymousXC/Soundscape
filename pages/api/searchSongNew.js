


const searchSong = async (req, res) => {
    const fetchData = await fetch(`https://soundscape-backend-api.vercel.app/search/songs?query=${req.body.searchQuery}`)
    const musicData = await fetchData.json()
    res.status(200).json(musicData.data.results)
}

export default searchSong