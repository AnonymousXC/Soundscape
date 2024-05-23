'use server'
import { redirect } from "next/navigation"
import { createClient } from "./supabase"

async function loginFunc(email: string, password: string, username: string) {

    const supabase = createClient()

    const AUTH = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })

    console.log(AUTH.data, AUTH.error)
    redirect('/profile')
    return JSON.stringify(AUTH || undefined);
}

export default loginFunc;