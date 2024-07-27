"use server";

import { createClient } from "./supabase";

async function changeUsername(name: string) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.updateUser({
        data: {
            username: name,
        },
    });
    if (data.user !== null)
        return { error: false, message: "Successfully changed username." };
    else if (error !== null)
        return {
            error: true,
            message: "Error updating username. Please try again later.",
        };
}

export default changeUsername;
