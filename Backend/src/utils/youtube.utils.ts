/**
 * Validates that a string looks like an 11-character YouTube video ID.
 */
function isValidVideoId(videoId: string): boolean {
    return /^[a-zA-Z0-9_-]{11}$/.test(videoId);
}

/**
 * Normalises any user-supplied string into a proper URL by
 * prepending https:// when the protocol is missing.
 */
function normaliseUrl(raw: string): string {
    let url = raw.trim();

    // Strip leading single/double quotes that sometimes get pasted
    url = url.replace(/^["']+|["']+$/g, "");

    // If no protocol at all, prepend https://
    if (!/^https?:\/\//i.test(url)) {
        url = `https://${url}`;
    }

    return url;
}

/**
 * Extracts a YouTube video ID from every known URL shape.
 *
 * Supported shapes:
 *  - https://www.youtube.com/watch?v=ID
 *  - https://youtu.be/ID
 *  - https://youtube.com/shorts/ID
 *  - https://youtube.com/embed/ID
 *  - https://youtube.com/live/ID
 *  - https://m.youtube.com/watch?v=ID
 *  - https://music.youtube.com/watch?v=ID
 *  - youtube.com/watch?v=ID   (missing protocol — auto-fixed)
 *  - bare 11-char video ID
 *
 * Throws a descriptive error if it cannot extract an ID.
 */
function getVideoId(rawUrl: string): string {

    // ── Edge-case: raw 11-char video ID pasted directly ──
    if (isValidVideoId(rawUrl.trim())) {
        return rawUrl.trim();
    }

    // ── Normalise the URL (add https:// if missing) ──
    const normalised = normaliseUrl(rawUrl);

    let parsedUrl: URL;
    try {
        parsedUrl = new URL(normalised);
    } catch {
        throw new Error(
            `Invalid URL format. Received: "${rawUrl}". ` +
            `Please provide a full YouTube URL like https://www.youtube.com/watch?v=VIDEO_ID`
        );
    }

    // ── Verify it's actually a YouTube domain ──
    const validHosts = [
        "youtube.com",
        "www.youtube.com",
        "m.youtube.com",
        "music.youtube.com",
        "youtu.be",
    ];

    if (!validHosts.includes(parsedUrl.hostname)) {
        throw new Error(
            `Not a YouTube URL. Host "${parsedUrl.hostname}" is not recognised. ` +
            `Supported: ${validHosts.join(", ")}`
        );
    }

    // ── Extract video ID from query param: ?v=ID ──
    if (parsedUrl.searchParams.has("v")) {
        const id = parsedUrl.searchParams.get("v")!;
        if (isValidVideoId(id)) return id;
        throw new Error(
            `The "v" parameter "${id}" is not a valid 11-character YouTube video ID.`
        );
    }

    const parts = parsedUrl.pathname.split("/").filter(Boolean);

    // ── youtu.be/<id> ──
    if (parsedUrl.hostname === "youtu.be" && parts[0] && isValidVideoId(parts[0])) {
        return parts[0];
    }

    // ── /shorts/<id>, /embed/<id>, /live/<id>, /v/<id> ──
    const pathPrefixes = ["shorts", "embed", "live", "v"];
    if (pathPrefixes.includes(parts[0]) && parts[1] && isValidVideoId(parts[1])) {
        return parts[1];
    }

    throw new Error(
        `Could not extract a video ID from "${rawUrl}". ` +
        `Please use a standard YouTube link like https://www.youtube.com/watch?v=VIDEO_ID`
    );
}

/**
 * Builds a clean, canonical YouTube watch URL from a video ID.
 * This is what we pass to yt-dlp to avoid any URL-format issues.
 */
function buildCanonicalUrl(videoId: string): string {
    return `https://www.youtube.com/watch?v=${videoId}`;
}

export default getVideoId;
export { getVideoId, buildCanonicalUrl, isValidVideoId };