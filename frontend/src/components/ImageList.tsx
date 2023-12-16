import React, { useEffect, useState } from 'react';

const api_ip = import.meta.env.REACT_APP_API_CONTACT_POINT || 'localhost';
const BASE_URL = `http://${api_ip}:8000`

export enum ListFilteringOptions  {
    CLUSTERED,
    ClASSIFIED,
    BYDATE
}

interface Props{
    imageList:any;
    listFilteringOption: ListFilteringOptions;
}



function ImageList({imageList, listFilteringOption}:Props){
    switch(listFilteringOption){
        case ListFilteringOptions.CLUSTERED:
            // filter the list then return it
            return 
        case ListFilteringOptions.ClASSIFIED:
            // filter the list then return it
            return 
        case ListFilteringOptions.BYDATE:
            // filter the list then return it
            return 
        default:
            return imageList
    }






  return (
    <div>
      <h2>Gallery</h2>
      <div className="gallery">
      {
        imageList && imageList.length > 0 && imageList.filter() && imageList.map((item,index) => (
          <div className="image-box" key={index}>
            {/* <p>{item.image_url}</p> */}
            <p>{item.result_json["image-detection"]}</p>
            <img className="galleryimage" src={BASE_URL+item.image_url} alt={item.createdAt} />
            {/* {item.cluster_group!=null ? <p>Cluster : {item.cluster_group.ids},</p> : null } */}
          </div>
        ))
      }
      </div>
    </div>
  );
};

export default ImageList;
