function isValidVideoId(videoId: string): boolean {
    const regex = /^[a-zA-Z0-9_-]{11}$/;

    return regex.test(videoId);
}


function getVideoId(url: string) {
    const parsedUrl = new URL(url);

    const validHosts = [
        "youtube.com",
        "www.youtube.com",
        "m.youtube.com",
        "music.youtube.com",
        "youtu.be",
    ];

    if (!validHosts.includes(parsedUrl.hostname)) {
        throw new Error("Invalid YouTube URL");
    }

    // watch?v=
    if (parsedUrl.searchParams.has("v")) {
        const id = parsedUrl.searchParams.get("v")!;
        if (isValidVideoId(id)) return id;
    }

    const parts = parsedUrl.pathname.split("/").filter(Boolean);

    // youtu.be/<id>
    if (parsedUrl.hostname === "youtu.be") {
        return parts[0];
    }

    // shorts/<id>
    if (parts[0] === "shorts") {
        return parts[1];
    }

    // embed/<id>
    if (parts[0] === "embed") {
        return parts[1];
    }

    // live/<id>
    if (parts[0] === "live") {
        return parts[1];
    }

    throw new Error("Video ID not found");
}

export default getVideoId