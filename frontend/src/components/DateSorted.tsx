import React, { useEffect, useState } from 'react';
import { ApiImageObject } from '../utils/DTOinterfaces';



interface Props{
    list: Array<ApiImageObject>;
    listName: string;
    BASE_URL:string;
}


function DateSorted({list,listName,BASE_URL}:Props){
  return (
    <div className="date-sorted">
      {list && list.length !=0 &&       <h3 className='date-sorted-title'>{listName}</h3>
}
      <div className="date-sorted-list">
      {
        list && list.length > 0 && list.map((item,index) => (
          <div className="date-sorted-list-item" key={index}>
            <p className='image-detected'>{item.result_json["image-detection"]}</p>
            <img className="galleryimage" src={BASE_URL+item.image_url} alt={item.filename} />

          </div>
        ))
      }
      </div>
    </div>

  );
};

export default DateSorted;
