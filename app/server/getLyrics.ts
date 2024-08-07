"use server";

type ReturnTypeSuccess = {
    success: boolean;
    data: {
        lyrics: string;
        snippet: string;
        copyright: string;
    };
};

async function getLyric(id: string): Promise<ReturnTypeSuccess> {
    const rawData = await fetch(
        `${process.env.MUSIC_API_URL_V2}/api/songs/${id}/lyrics`,
        { cache: "force-cache" }
    );
    const data = await rawData.json();
    return data;
}

export default getLyric;
