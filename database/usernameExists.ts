"use server";
import { createClient } from "./supabase";

async function usernameAlreadyExists(username: string) {
    const supabase = createClient();
    const data = await supabase
        .from("users")
        .select("*")
        .eq("username", username);
    if (data.data?.length === 0 && data.status === 200)
        return { exists: false };
    else return { exists: true };
}

export default usernameAlreadyExists;
