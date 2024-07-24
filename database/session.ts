"use server";
import { UserResponse } from "@supabase/supabase-js";
import { createClient } from "./supabase";

async function getSession() {
    const supabase = createClient();
    const user = await supabase.auth.getUser();
    if (user.data.user !== null) return user;
    else return { data: { user: null } } as UserResponse;
}

export default getSession;
