import type { NextApiRequest, NextApiResponse } from "next";


async function getSongDataByID(req : NextApiRequest, res : NextApiResponse) {
    const resData = await fetch(`https://soundscape-backend-api.vercel.app/songs?id=${req.body.songDataID}`)
    const songData = await resData.json()
    res.status(200).json(songData)
}

export default getSongDataByID