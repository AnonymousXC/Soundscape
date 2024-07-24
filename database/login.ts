"use server";
import { redirect } from "next/navigation";
import { createClient } from "./supabase";

async function loginFunc(
    email: string,
    password: string,
    username: string,
    id: string
) {
    const supabase = createClient();

    const AUTH = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    return JSON.stringify(AUTH);
}

export default loginFunc;
