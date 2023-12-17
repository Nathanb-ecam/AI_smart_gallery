import React, { useEffect, useState } from 'react';
import { ApiImageObject } from '../utils/DTOinterfaces';



interface Props{
    groups: any;
    BASE_URL:string;
}


function ClusterSorted({groups,BASE_URL}:Props){
    console.log("Cluster Group",groups)
  return (
      <div className="all-cluster-groups">
        <h3 className='title'>Cluster-sorted</h3>
        {groups && groups.length != 0 &&
        Object.entries(groups).map(([key, value]) => (
        <div className="group" key={key}>
          <h3> Groupe : {key}</h3>
          <div className="cluster-single-group">
            {value.map((item:any, index:any) => (
              <div key={index}>
                <img className="galleryimage" src={BASE_URL+item.image_url} alt={item.created_at} />              
              </div>
            ))}

          </div>
        </div>
      ))}
      </div>
  );
};

export default ClusterSorted;