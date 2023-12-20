import React, { useEffect, useState } from 'react';
import ClusterSorted from './ClusterSorted';
import { CompareDates, GroupByClusterId,SortByClasses  } from '../utils/ListSortings';
// const ANIMAL_OF_INTEREST = ['bird','cat','dog','horse','sheep','cow','elephant','bear','zebra','giraffe']
import { ApiImageObject} from '../utils/DTOinterfaces';
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
  const [clusterNames, setClusterNames] = useState<Array<Object>>([]);
  const [classNames, setClassNames] = useState<Array<Object>>([]);
  const [clusterSorted, setClusterSorted] = useState<any>({});
  const [classSorted, setClassSorted] = useState({});
  const [dateSorted, setDateSorted] = useState<Array<ApiImageObject>>([]);

  const fetchClusteringNames = async () => {
    try {
      const response = await fetch(BASE_URL + "/api/cluster_names");
      const result = await response.json();
      if (result.cluster_names) {
        // const sort = GroupByClusterId(imageList);
        // setClusterSorted(sort);
        setClusterNames(result.cluster_names);
      }
    } catch (error) {
      // console.error('Error fetching data:', error);
    }
  };


  const fetchGallery = async () => {
    try {
      const response = await fetch(BASE_URL+"/api/cluster_gallery");
      const result = await response.json();
      // console.log("Gallery", result)
      if(result.gallery){
        const sort = GroupByClusterId(result.gallery)
        setClusterSorted(sort);
        console.log("clustered",sort)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  
  useEffect(() => {
      switch (FilteringOption) {
        case ListFilteringOptions.BYDATE:
          setDateSorted(imageList.sort(CompareDates));
          setClassSorted([])
          setClusterSorted({})
          break;
        case ListFilteringOptions.CLASSIFIED:
          const { personList, animalList, otherList } = SortByClasses(imageList);
          setClassSorted({"person":personList,"animal": animalList,"other" :otherList});
          setDateSorted([])
          setClusterSorted({})
          break;
        case ListFilteringOptions.CLUSTERED:
          fetchClusteringNames();
          fetchGallery();
          setClassSorted([])
          setDateSorted([])
          break;
        default:
          // Handle default case or set default values
          break;
      }
    }, [FilteringOption, imageList, BASE_URL]);




  return (
      <>
        {clusterSorted && Object.keys(clusterSorted).length != 0 &&
          <ClusterSorted groups={clusterSorted} cluster_labels={clusterNames} BASE_URL={BASE_URL} />
        }

        {dateSorted && dateSorted.length != 0 &&
          <DateSorted list={dateSorted} listName="Sorted by dates" BASE_URL={BASE_URL} />
        }

        {classSorted && 
          <ClassSorted classes={classSorted} classNames={classNames} sortType="Sorted by classes" BASE_URL={BASE_URL} />
        }
      </>
  );
};

export default ImageList;
