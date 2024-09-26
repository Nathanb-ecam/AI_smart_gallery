import React, { useEffect, useState } from 'react';
import ImageList, { ListFilteringOptions } from './ImageList';
import Dropdown from 'react-bootstrap/Dropdown';
import { ApiImageObject } from '../utils/DTOinterfaces';


interface Props{
  formSubmitted:boolean;
  refreshGallery:boolean;
  BASE_URL:string;

}



function ShowGallery({formSubmitted,refreshGallery,BASE_URL}:Props){

  const [galleryImages, setGalleryImages] = useState<Array<ApiImageObject>>([]);
  const [dropdownValue,setDropdownValue] = useState<string | null>(null);
  const [filteringOption,setFilteringOption] = useState<ListFilteringOptions>(ListFilteringOptions.BYDATE);
  const [currentFilter, setCurrentFilter] = useState("Filter");

  const handleDropdownSelect:React.ComponentProps<typeof Dropdown>['onSelect']= (eventKey:string) => {
    setDropdownValue(eventKey as string);
    
    // console.log(eventKey as string);
    switch(eventKey as string){
      case 'DATE':
        setFilteringOption(ListFilteringOptions.BYDATE)
        setCurrentFilter("Date")
        // fetchGallery()
        break
      case 'CLUSTERED':
        setFilteringOption(ListFilteringOptions.CLUSTERED)
        setCurrentFilter("Clusters")
        break
      case 'CLASSIFIED':
        setFilteringOption(ListFilteringOptions.CLASSIFIED)
        setCurrentFilter("Classes")
        // fetchGallery()
        break
    }
  }

   useEffect(()=>{
     const fetchGallery = async () => {
       try {
         const response = await fetch(BASE_URL+"/api/fetch_gallery");
         const result = await response.json();
         // console.log("Gallery", result)
         if(result.gallery){
           setGalleryImages(result.gallery);
          //  console.log("gallery",result.gallery)
           
         }
       } catch (error) {
         // console.error('Error fetching data:', error);
       }
     };
     fetchGallery()
   },[refreshGallery])

  



  return (
    <div className='gallery-section'>
      <div className="gallery-header">
        <Dropdown  onSelect={handleDropdownSelect}>
          <Dropdown.Toggle className="filter-dropdown" variant="success" id="dropdown-basic">
            {currentFilter}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="CLUSTERED">
              CLUSTERED
            </Dropdown.Item>
            <Dropdown.Item eventKey="CLASSIFIED">
              CLASSIFIED
            </Dropdown.Item>
            <Dropdown.Item eventKey="DATE">
              BY DATE
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="gallery-content">
        <ImageList imageList={galleryImages} FilteringOption={filteringOption} formSubmitted={formSubmitted} BASE_URL={BASE_URL}/>

      </div>
    </div>
  );
};

export default ShowGallery;
