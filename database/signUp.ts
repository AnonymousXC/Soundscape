'use server'
import { redirect } from "next/navigation"
import { createClient } from "./supabase"

async function signUpFunc(email: string, password: string, username: string, id : string) {

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
    
    return JSON.stringify(AUTH || undefined);
}

export default signUpFunc;