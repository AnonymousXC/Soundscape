"use server";
import { createClient } from "./supabase";

async function changePassword(password: string) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.updateUser({
        password: password,
    });

    if (data.user !== null)
        return {
            error: null,
            message: "Password updated successfully.",
        };
    else if (error !== null)
        return {
            error: JSON.stringify(error),
            message: "Error changing password.",
        };
}

export default changePassword;
