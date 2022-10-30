


const searchSong = async (req, res) => {
    const fetchData = await fetch(`https://saavn.me/search/songs?query=${req.body.searchQuery}`)
    const musicData = await fetchData.json()
    res.status(200).json(musicData)
}

export default searchSong