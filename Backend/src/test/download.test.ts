import downloadAudio from "../services/youtube/download.service.js";

async function main() {
    const file = await downloadAudio(
       `${downloadAudio.url},
       &{downloadAudio.videoId}
       `
    );

    console.log(file);
}

main();