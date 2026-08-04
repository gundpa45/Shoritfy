import downloadAudio from "../services/youtube/download.service.js";

async function main() {
  const file = await downloadAudio(
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "dQw4w9WgXcQ"
  );

  console.log(file);
}

main();