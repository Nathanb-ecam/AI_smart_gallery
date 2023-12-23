import React, { useEffect, useState } from 'react';
import { ApiImageObject } from '../utils/DTOinterfaces';



interface Props{
    groups: any;
    BASE_URL:string;
}


function ClusterSorted({groups,BASE_URL}:Props){
  // console.log("groups",groups)
  Object.entries(groups).map(([key, group],image_idx)=>{
    console.log()
    console.log("group", group);
    // console.log("image_idx", image_idx);
    // console.log("group[image_idx]", group[image_idx]);
    console.log("group[image_idx]?.cluster_info", group[image_idx]?.cluster_info);
    // console.log("group[image_idx]?.cluster_info?.tags", group[image_idx]?.cluster_info?.tags);
  })


    const modifyClusterName = async (clusterId:number,clusterNewName:string) => {
      try {
        const response = await fetch(BASE_URL+`/api/modify_cluster_name/${clusterId}`, {
          method: 'PUT',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify({"cluster_name":clusterNewName}),
        });
        const result = await response.json()
        console.log("New cluster tag added", result)
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    
    const handleClusterNameChange = (key: string, newName: string) => {
      const k = parseInt(key)
      modifyClusterName(k,newName)
    }


  return (
      <div className="all-cluster-groups">
        {groups && Object.keys(groups).length != 0 && <h3 className='title'>Cluster-sorted</h3>
}

        {groups && Object.keys(groups).length != 0 &&
        Object.entries(groups).map(([key, group],image_idx) => (
        <div className="group" key={image_idx}>
          <h3 className='cluster-name' 
            contentEditable
            onBlur={(e) => handleClusterNameChange(key, e.currentTarget.innerText)}
              >
            {(key && group[0].cluster_info?.tags) ||  key }
            </h3>

          <div className="cluster-single-group">
            {group.map((item:any, index:any) => (
              <div className='clustered-single-image' key={index}>
                <img className="galleryimage" src={BASE_URL+item.image_url} alt={item.filename} />              
              </div>
            ))}

          </div>
        </div>
      ))}
      </div>
  );
};

export default ClusterSorted;
