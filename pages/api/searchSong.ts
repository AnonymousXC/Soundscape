import type { NextApiRequest, NextApiResponse } from 'next'


const searchSong = async ( req : NextApiRequest, res: NextApiResponse) => {
  let query = await fetch(`${process.env.NEXT_PUBLIC_MUSIC_API_URL}/search?query=${req.body.searchQuery}`, {method: "GET"})
  let data = await query.json() 
  res.status(200).json(data)
}



export default searchSong 