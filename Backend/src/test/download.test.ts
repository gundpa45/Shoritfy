import downloadAudio from "../services/youtube/download.service.js";

async function main() {
    const file = await downloadAudio(
        "https://youtu.be/IW6ct9S4MYc?si=-e8T0L_dvKsYe-TH",
        "IW6ct9S4MYc"
    );

    console.log(file);
}

main();