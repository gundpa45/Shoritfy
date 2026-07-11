


 function getVideoId(url:string){

    const parsedUrl=new URL(url);

    if(!parsedUrl.hostname.includes('youtube.com')){
        throw new Error('Invalid youtube url'); 
    }

    const videoId=parsedUrl.searchParams.get("v")


    if(!videoId){
        throw new Error("video is not found ")
    }
    return videoId 


}


export default getVideoId