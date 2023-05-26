import type { NextApiRequest, NextApiResponse } from "next";


async function getSongDataByID(req : NextApiRequest, res : NextApiResponse) {
    const resData = await fetch(`https://soundscape-backend-api.vercel.app/songs?id=${req.body.songDataID}`)
    const songData = await resData.json()
    songData.data[0].name = songData.data[0].name.replace(/&#.*;/, '')
    songData.data[0].album.name = songData.data[0].album.name.replace(/&#.*;/, '') 
    res.status(200).json(songData.data[0])
}

export default getSongDataByID