
async function fetchYoutubeVideos(req, res) {
    const searchQuery = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&type=video&q=${req.body.searchQuery}`)
    const searchData = (await searchQuery.json()).items
    res.status(200).json(searchData)
} 

export default fetchYoutubeVideos