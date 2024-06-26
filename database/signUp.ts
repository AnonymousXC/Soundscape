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

    console.log(AUTH.data, AUTH.error)
    if(id)
        redirect('/profile?id=' + id)
    else
        redirect('/profile')
    return JSON.stringify(AUTH || undefined);
}

export default signUpFunc;