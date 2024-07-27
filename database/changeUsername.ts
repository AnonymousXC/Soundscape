"use server";
import { createClient } from "./supabase";

async function changeUsername(name: string) {
    const supabase = createClient();
    const user = await supabase.auth.getUser();
    const updateUserMetadata = await supabase.auth.updateUser({
        data: {
            username: name,
        },
    });
    const updateUserTable = await supabase
        .from("users")
        .update({ username: name })
        .eq("id", user.data.user?.id);
    if (updateUserMetadata.data.user !== null && updateUserTable.error === null)
        return { error: false, message: "Successfully changed username." };
    else if (updateUserMetadata.error !== null)
        return {
            error: true,
            message: "Error updating username. Please try again later.",
        };
}

export default changeUsername;
