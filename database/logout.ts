'use server'
import { redirect } from "next/navigation"
import { createClient } from "./supabase"

async function Logout() {
    const supabase = createClient()
    const status = await supabase.auth.signOut()
    console.log(status)
    redirect('/auth')
}

export default Logout;