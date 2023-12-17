import React, { useEffect, useState } from 'react';
import ClusterSorted from './ClusterSorted';
import { CompareDates, GroupByClusterId,SortByClasses  } from '../utils/ListSortings';
// const ANIMAL_OF_INTEREST = ['bird','cat','dog','horse','sheep','cow','elephant','bear','zebra','giraffe']
import { ApiImageObject } from '../utils/DTOinterfaces';
import DateSorted from './DateSorted';
import ClassSorted from './ClassSorted';


export enum ListFilteringOptions  {
    CLUSTERED,
    CLASSIFIED,
    BYDATE
}




interface Props{
    imageList:Array<ApiImageObject>;
    FilteringOption?: ListFilteringOptions | null ;
    BASE_URL:string;
}




function ImageList({imageList, FilteringOption = null,BASE_URL}:Props){
    let displayedImages:Array<ApiImageObject> = []
    let dateSorted:Array<ApiImageObject> = []
    let clusterSorted = {}
    let classSorted:Array<Array<ApiImageObject>> = []

    switch(FilteringOption){
        case ListFilteringOptions.BYDATE:
            dateSorted = imageList.sort(CompareDates)
            break
        case ListFilteringOptions.CLASSIFIED:
            const { personList, animalList, otherList } = SortByClasses(imageList);
            classSorted.push(personList,animalList,otherList)
            break
        case ListFilteringOptions.CLUSTERED:
            const sort:Array<Array<ApiImageObject>> = GroupByClusterId(imageList)
            // clusterSorted.push(sort)
            // console.log("sort",sort)
            clusterSorted = sort;
            // console.log("clusterSorted",clusterSorted)
            break

        // default:
        //     displayedImages = imageList;
        //     break;
    }






  return (
      <>
      {
        displayedImages && displayedImages.length > 0 && displayedImages.map((item,index) => (
          <div className="image-box" key={index}>
            {/* <p>{item.image_url}</p> */}
            <p>{item.result_json["image-detection"]}</p>
            <img className="galleryimage" src={BASE_URL+item.image_url} alt={item.created_at} />
            {item.cluster_ids!=null ? <p>Cluster : {item.cluster_ids.ids}</p> : null }
          </div>
        ))
      }


        {clusterSorted && Object.keys(clusterSorted).length != 0 &&
          <ClusterSorted groups={clusterSorted} BASE_URL={BASE_URL} />
        }

        {dateSorted && dateSorted.length != 0 &&
          <DateSorted list={dateSorted} listName="Date-sorted" BASE_URL={BASE_URL} />
        }

        {classSorted && classSorted.length != 0 &&
          <ClassSorted classes={classSorted} className="Class-sorted" BASE_URL={BASE_URL} />
        }
      </>
  );
};

export default ImageList;
