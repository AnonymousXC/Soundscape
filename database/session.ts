'use server'
import { createClient } from "./supabase";


async function getSession() {
    const supabase = createClient()
    const user = await supabase.auth.getUser()
    return user;
}

export default getSession;