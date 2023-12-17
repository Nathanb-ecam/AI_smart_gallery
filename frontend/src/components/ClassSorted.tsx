import React, { useEffect, useState } from 'react';
import { ApiImageObject } from '../utils/DTOinterfaces';



interface Props{
    classes: Array<Array<ApiImageObject>>;
    className: string;
    BASE_URL:string;
}


function ClassSorted({classes,className,BASE_URL}:Props){
    console.log("CLASS SORTED",classes)

  return (
    <div className="class-sorted">
        <h3 className='title'>{className}</h3>
        <div className="class-sorted-images">
      {
        classes && classes.length > 0 && classes.map((array, indx) => (
            <div className='subclass' key={indx}>
              <h3>{array.length!=0 && indx}</h3>
                {array.map((item,index)=>(
                    <div key={index} className='image-box'>
                        {/* <p>{item.filename}</p> */}
                        <img className="galleryimage" src={BASE_URL+item.image_url} alt={item.created_at} />
                    </div>
    
                ))
                }
            </div>

        ))
      }
        </div>
        
    </div>
  );
};

export default ClassSorted;


{/* <div className="image-box" key={index}>
<p>{item.image_url}</p>
<p>{item.result_json["image-detection"]}</p>
</div> */}