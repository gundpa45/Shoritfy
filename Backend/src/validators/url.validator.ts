import type { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

function validateUrl(req: Request, res: Response, next: NextFunction) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    // Extra server-side check: the URL must contain a YouTube indicator
    const url: string = (req.body.url || "").trim();
    const youtubePatterns = [
        "youtube.com",
        "youtu.be",
    ];
    const looksLikeYouTube = youtubePatterns.some((p) => url.toLowerCase().includes(p));

    // Also allow raw 11-char video IDs
    const isRawId = /^[a-zA-Z0-9_-]{11}$/.test(url);

    if (!looksLikeYouTube && !isRawId) {
        return res.status(400).json({
            errors: [
                {
                    msg: "Only YouTube URLs are supported. Please paste a valid YouTube video link.",
                    path: "url",
                },
            ],
        });
    }

    next();
}

export const urlValidator = [
    body("url")
        .trim()
        .notEmpty()
        .withMessage("URL is required")
        .isString()
        .withMessage("URL must be a string"),
    validateUrl,
];
