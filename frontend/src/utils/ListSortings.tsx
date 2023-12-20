
import { ApiImageObject } from "./DTOinterfaces";

export function CompareDates(a:ApiImageObject, b:ApiImageObject){
    const dateA:any = new Date(a.created_at);
    const dateB:any = new Date(b.created_at);
    return dateB - dateA;
};


export function GroupByClusterId(imageList:Array<ApiImageObject>)  {
    if (!Array.isArray(imageList)) {
      console.error('imageList is not an array:', imageList);
      return {};
    }
    console.log(imageList)
    var groups  = {}
    for(const obj of imageList){
      // console.log(obj.result_json["image-detection"])
      let classes = obj.result_json["image-detection"]
      if(classes.includes('person')){
        if(obj.cluster_ids.ids.length === 0){
          if(!groups["default"]){
            groups["default"] = []
          }
          groups["default"].push(obj) 
        }else{
          for( let id of obj.cluster_ids.ids){
            if(!groups[id]){
              groups[id] = []
            }
            groups[id].push(obj)      
          }
  
        }
      }
    }  
    return groups;
  }


export function SortByClasses(imageList:Array<Object>) {
    const personList:Array<ApiImageObject> = [];
    const animalList:Array<ApiImageObject> = [];
    const otherList:Array<ApiImageObject> = [];
  
    imageList.forEach((item:any) => {
      const detection = item.result_json['image-detection'];
      if (detection.includes('person')) {
        personList.push(item);
      } else if (detection.size === 0) {
        otherList.push(item);
      } else {
        animalList.push(item);
      }
    });
  
    return { personList, animalList, otherList };
}


export function GroupByAnimalTypes(animals:Array<ApiImageObject>) {
  const groupedObjects = {};
  const uniqueAnimalTypes = new Set();

  if(animals != undefined){
    animals.forEach((obj) => {
      const imageDetection = obj.result_json["image-detection"];
  
      if (imageDetection && Array.isArray(imageDetection)) {
        imageDetection.forEach((animalType) => {
          if (!uniqueAnimalTypes.has(animalType)) {
            uniqueAnimalTypes.add(animalType);
  
            if (!groupedObjects[animalType]) {
              groupedObjects[animalType] = [];
            }
  
            groupedObjects[animalType].push(obj);
          }
        });
      }
    });
  
    return groupedObjects;
  }
  else{
    return {}
  }
}