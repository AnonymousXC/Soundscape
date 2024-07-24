"use server";
import { redirect } from "next/navigation";
import { createClient } from "./supabase";

async function Logout(id: string) {
    const supabase = createClient();
    const status = await supabase.auth.signOut();
    if (id) redirect("/profile?id=" + id);
    else redirect("/profile");
}

export default Logout;
