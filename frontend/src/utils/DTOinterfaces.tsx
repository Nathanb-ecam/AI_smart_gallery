
export interface DetectedClasses{
    "image-detection":Array<string>;
}


export interface ApiImageObject{
    image_url:string,
    filename:string,
    result_json:DetectedClasses,
    cluster_ids:Object,
    created_at:string
}