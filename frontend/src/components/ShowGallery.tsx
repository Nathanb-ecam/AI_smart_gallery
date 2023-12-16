import React, { useEffect, useState } from 'react';
import ImageList from './ImageList';

function ShowGallery(){
  const api_ip = import.meta.env.REACT_APP_API_CONTACT_POINT || 'localhost';
  const BASE_URL = `http://${api_ip}:8000`

  const [humanImages, setHumanImages] = useState<Array<{image_url:string;filename:string,result_json:Object;cluster_group:number,createdAt:string;}>>([]);
  const [animalImages, setAnimalImages] = useState<Array<{image_url:string;filename:string,result_json:Object;createdAt:string;}>>([]);
  const [otherImages, setOtherImages] = useState<Array<{image_url:string;filename:string,result_json:Object;createdAt:string;}>>([]);
  // const [images, setImages] = useState(null);

    useEffect(() => {
      const fetchGallery = async () => {
        try {
          const human_response = await fetch(BASE_URL+"/api/fetch_humans");
          const human_result = await human_response.json();
          console.log("Human", human_result)
          if(human_result.humans){
            setHumanImages(human_result.humans);
          }

          const animal_response = await fetch(BASE_URL+"/api/fetch_animals");
          const animal_result = await animal_response.json();
          console.log("Animal", animal_result)
          setAnimalImages(animal_result.animals);

          const other_response = await fetch(BASE_URL+"/api/fetch_others");
          const other_result = await other_response.json();
          console.log("Other", other_result)
          setOtherImages(other_result.others);



        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchGallery();
    }, []);





  return (
    <div>
      <h2>Gallery</h2>
      <div className="gallery">
      {
        humanImages && humanImages.length > 0 && humanImages.filter() && humanImages.map((item,index) => (
          <div className="image-box" key={index}>
            {/* <p>{item.image_url}</p> */}
            <p>{item.result_json["image-detection"]}</p>
            <img className="galleryimage" src={BASE_URL+item.image_url} alt={item.createdAt} />
            {/* {item.cluster_group!=null ? <p>Cluster : {item.cluster_group.ids},</p> : null } */}
          </div>
        ))
      }
      {
        animalImages && animalImages.length > 0 && animalImages.map((item,index) => (
          <div className="image-box" key={index}>
            {/* <p>{item.filename}</p> */}
            <p>{item.result_json["image-detection"]}</p>
            <img className="galleryimage" src={BASE_URL+item.image_url} alt={item.createdAt} />
          </div>
        ))
      }
      </div>
    </div>
  );
};

export default ShowGallery;
