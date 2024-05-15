'use server'

import { revalidatePath } from "next/cache"

async function getTrending() {
    const fetchData = await fetch(process.env.MUSIC_API_URL + '/modules?language=english', {cache: 'force-cache'})
    const data = await fetchData.json()
    // console.log(data.data.trending)
    // revalidatePath('/dashboard')
    return data
}

export default getTrending;