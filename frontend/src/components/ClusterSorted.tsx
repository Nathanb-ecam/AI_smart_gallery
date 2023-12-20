import React, { useEffect, useState } from 'react';
import { ApiImageObject } from '../utils/DTOinterfaces';



interface Props{
    groups: any;
    cluster_labels:Array<Object>
    BASE_URL:string;
}


function ClusterSorted({groups,cluster_labels,BASE_URL}:Props){
    console.log("Cluster Group",groups)
    console.log("cluster_labels",cluster_labels)

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
        // console.log("Modify cluster name", result)
      } 
      catch (error) {
        // console.error('Error fetching data:', error);
      }
    };

    
    const handleClusterNameChange = (key: string, newName: string) => {
      const k = parseInt(key)
      modifyClusterName(k,newName)
    }

  return (
      <div className="all-cluster-groups">
        <h3 className='title'>Cluster-sorted</h3>
        {groups && groups.length != 0 &&
        Object.entries(groups).map(([key, value]) => (
        <div className="group" key={key}>
          <h3 contentEditable
            onBlur={(e) => handleClusterNameChange(key, e.currentTarget.innerText)}
              >
            {(key && cluster_labels[key]) ||  key }
            {/* {key} */}
            </h3>
            {/* <button onClick={() => handleButtonClick(key, value)}>Update</button> */}
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
