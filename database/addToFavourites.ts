"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "./supabase";

async function addToFavourites(songID: string) {
    const supabase = createClient();
    const userID = (await supabase.auth.getUser()).data.user?.id;
    const favArr: any = await (
        await supabase.from("favourites").select("*").eq("user_uuid", userID)
    ).data;
    if (favArr.length === 0) {
        const status = await supabase.from("favourites").insert({
            songs: [songID],
        });
        revalidatePath("/favorite");
        return status;
    } else {
        let newSongs: string[] = favArr[0].songs;
        let removed = false;
        if (newSongs.indexOf(songID) === -1) {
            newSongs.push(songID);
            newSongs = newSongs.sort((a: string, b: string) =>
                a.localeCompare(b)
            );
        } else {
            removed = true;
            newSongs.splice(newSongs.indexOf(songID), 1);
            newSongs = newSongs.sort((a: string, b: string) =>
                a.localeCompare(b)
            );
        }
        const status = await supabase
            .from("favourites")
            .upsert({
                user_uuid: userID,
                songs: newSongs,
            })
            .eq("user_uuid", userID);
        if (removed === true) {
            status.status = 300;
            revalidatePath("/favorite");

            return status;
        }
        revalidatePath("/favorite");
        return status;
    }
}

export default addToFavourites;
