export interface ClusterIds{
    "ids":Array<number>;
    // "ids":Array<Object>;
}


export interface DetectedClasses{
    "image-detection":Array<string>;
}




export interface ApiImageObject{
    image_url:string,
    filename:string,
    result_json:DetectedClasses,
    cluster_ids:ClusterIds,
    created_at:string
}