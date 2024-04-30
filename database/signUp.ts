'use server'
import { createClient } from "./supabase"

async function signUpFunc(email: string, password: string, username: string) {

    const supabase = createClient()

    const AUTH = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                username: username
            }
        }
    })

    console.log(AUTH.data, AUTH.error)
    return JSON.stringify(AUTH || undefined);
}

export default signUpFunc;