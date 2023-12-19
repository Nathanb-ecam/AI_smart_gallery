import React, { useEffect, useState } from 'react';
import ClusterSorted from './ClusterSorted';
import { CompareDates, GroupByClusterId,SortByClasses  } from '../utils/ListSortings';
// const ANIMAL_OF_INTEREST = ['bird','cat','dog','horse','sheep','cow','elephant','bear','zebra','giraffe']
import { ApiImageObject, ClusterName } from '../utils/DTOinterfaces';
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
  const [clusterNames, setClusterNames] = useState<Array<ClusterName>>([]);
  const [clusterSorted, setClusterSorted] = useState<any>({});
  const [classSorted, setClassSorted] = useState<Array<Array<ApiImageObject>>>([]);
  const [dateSorted, setDateSorted] = useState<Array<ApiImageObject>>([]);

  const fetchClusteringData = async () => {
    try {
      const response = await fetch(BASE_URL + "/api/cluster_names");
      const result = await response.json();
      if (result.cluster_names) {
        const sort = GroupByClusterId(imageList);
        setClusterSorted(sort);
        setClusterNames(result.cluster_names);
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
          setClassSorted([personList, animalList, otherList]);
          setDateSorted([])
          setClusterSorted({})
          break;
        case ListFilteringOptions.CLUSTERED:
          fetchClusteringData();
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
          <DateSorted list={dateSorted} listName="Date-sorted" BASE_URL={BASE_URL} />
        }

        {classSorted && classSorted.length != 0 &&
          <ClassSorted classes={classSorted} className="Class-sorted" BASE_URL={BASE_URL} />
        }
      </>
  );
};

export default ImageList;
