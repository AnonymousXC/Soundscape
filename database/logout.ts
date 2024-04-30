'use server'
import { createClient } from "./supabase"

async function Logout() {
    const supabase = createClient()
    const status = await supabase.auth.signOut()
    console.log(status)
}

export default Logout;