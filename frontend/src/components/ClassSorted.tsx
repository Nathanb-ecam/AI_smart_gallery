import React, { useEffect, useState } from 'react';
import { ApiImageObject } from '../utils/DTOinterfaces';
import { GroupByAnimalTypes } from '../utils/ListSortings';



interface Props{
    classes:any;
    classNames: Array<Object>;    
    BASE_URL:string;
}


function ClassSorted({classes,classNames,BASE_URL}:Props){
    // console.log("names",classNames)
    const persons = classes["person"]
    const animals = classes["animal"]
    // console.log("animal",animals)
    const animalGroups = GroupByAnimalTypes(animals)
    const others = classes["other"]
  return (
    <div className="class-sorted">
        <div className="class-sorted-images">

          {
            persons && <h5 className='person-title'>Humans</h5>
          }
          <div className='all-persons'>
          {persons && persons.length>0 && persons.map((obj,index)=>(
                  <div key={index} className='image-box'>
                    <img className="galleryimage" src={BASE_URL+obj.image_url} alt={obj.filename} />
                </div>
          ))}
          </div>
            <div className="animal-groups">
              {animalGroups && Object.keys(animalGroups).length !=0 && <h5 className='animal-title'>Animals</h5> }
            {
              Object.keys(animalGroups).map((animalType) => (
                <div key={animalType} className="animal-group">
                  <h5 className='animal-class'>{animalType}</h5>
                  <div className="animal-group-images">
                    {animalGroups[animalType].map((obj, index) => (
                      <div key={index} className="image-box">
                        <img
                          className="galleryimage"
                          src={BASE_URL + obj.image_url}
                          alt={obj.filename}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))
            }
            </div>
            


            {
            others && others.length!=0 && <h3 className='person-title'>Others</h3>
          }
          <div className='all-others'>
          {others && others.length>0 && others.map((obj,index)=>(
                  <div key={index} className='image-box'>
                    <img className="galleryimage" src={BASE_URL+obj.image_url} alt={obj.filename} />
                </div>
          ))}
          </div>
        </div>
        
    </div>
  );
};

export default ClassSorted;

