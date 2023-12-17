import React, { useEffect, useState } from 'react';
import { ApiImageObject } from '../utils/DTOinterfaces';



interface Props{
    list: Array<ApiImageObject>;
    listName: string;
    BASE_URL:string;
}


function DateSorted({list,listName,BASE_URL}:Props){
    // console.log("DATE")
  return (
    <div className="date-sorted">
      <h3>{listName}</h3>
      <div className="date-sorted-list">
      {
        list && list.length > 0 && list.map((item,index) => (
          <div className="date-sorted-list-item" key={index}>
            {/* <p>{item.image_url}</p> */}
            <p className='image-detected'>{item.result_json["image-detection"]}</p>
            <img className="galleryimage" src={BASE_URL+item.image_url} alt={item.created_at} />
            {/* {item.cluster_ids!=null ? <p>Cluster : {item.cluster_ids.ids}</p> : null } */}
          </div>
        ))
      }
      </div>
    </div>

  );
};

export default DateSorted;
