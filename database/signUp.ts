'use server'
import { createClient } from "./supabase"

async function signUpFunc(email: string, password: string) {

    const supabase = createClient()

    const AUTH = await supabase.auth.signUp({
        email: email,
        password: password
    })

    console.log(AUTH.data, AUTH.error)
}

export default signUpFunc;