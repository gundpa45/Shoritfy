

 function getVideoId(url:string){

    const parsedUrl=new URL(url);

    if(!parsedUrl.hostname.includes('youtube.com')){
        throw new Error('Invalid youtube url'); 
    }

    const videoId=parsedUrl.searchParams.get("v")

    return videoId 


}


export default getVideoId