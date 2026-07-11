


 function getVideoId(url:string){

    const validHosts = [
    "youtube.com",
    "www.youtube.com",
    "m.youtube.com",
    "music.youtube.com",
    "youtu.be",
];

    const parsedUrl=new URL(url);

    if(!validHosts.includes(parsedUrl.hostname)){
        throw new Error('Invalid youtube url'); 
    }
//     console.log(parsedUrl.pathname);
// console.log(parsedUrl.searchParams);

    const videoId=parsedUrl.searchParams.get("v")

    // console.log(videoId);


    if(!videoId){
        throw new Error("Video ID not found")
    }
    return videoId 


}


export default getVideoId