// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


const searchSong = async ( req : NextApiRequest, res: NextApiResponse) => {
  let query = await fetch(`${process.env.MUSIC_API_URL}/search?query=likhe%20jo`, {method: "GET"})
  let data = await query.json() 
  res.status(200).json(data)
}



export default searchSong 