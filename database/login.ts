'use server'
import { createClient } from "./supabase"

async function loginFunc(email: string, password: string, username: string) {

    const supabase = createClient()

    const AUTH = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })

    console.log(AUTH.data, AUTH.error)
    return JSON.stringify(AUTH || undefined);
}

export default loginFunc;