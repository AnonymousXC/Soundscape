import type { NextApiRequest, NextApiResponse } from 'next'


const getSongInfo = async ( req : NextApiRequest, res: NextApiResponse) => {
    let songRes = await fetch(req.body.song_url, {method: "GET"})
    let songData = await songRes.json()
    res.status(200).json(songData)
}

export default getSongInfo