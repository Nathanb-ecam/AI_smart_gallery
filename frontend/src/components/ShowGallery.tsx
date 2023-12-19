import React, { useEffect, useState } from 'react';
import ImageList, { ListFilteringOptions } from './ImageList';
import Dropdown from 'react-bootstrap/Dropdown';
import { ApiImageObject } from '../utils/DTOinterfaces';


interface Props{
  formSubmitted:boolean;
  BASE_URL:string;

}



function ShowGallery({formSubmitted,BASE_URL}:Props){

  const [galleryImages, setGalleryImages] = useState<Array<ApiImageObject>>([]);
  const [dropdownValue,setDropdownValue] = useState<string | null>(null);
  const [filteringOption,setFilteringOption] = useState<ListFilteringOptions>(ListFilteringOptions.BYDATE);

  const handleDropdownSelect:React.ComponentProps<typeof Dropdown>['onSelect']= (eventKey:string) => {
    setDropdownValue(eventKey as string);
    // console.log(eventKey as string);
    switch(eventKey as string){
      case 'DATE':
        setFilteringOption(ListFilteringOptions.BYDATE)
        break
      case 'CLUSTERED':
        const fetchClusteredGallery = async () => {
          try {
            const response = await fetch(BASE_URL+"/api/cluster_gallery");
            const result = await response.json();
            // console.log("Gallery", result)
            if(result.gallery){
              setGalleryImages(result.gallery);
              setFilteringOption(ListFilteringOptions.CLUSTERED)
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchClusteredGallery()
        break
      case 'CLASSIFIED':
        setFilteringOption(ListFilteringOptions.CLASSIFIED)
        break
    }
  }




    useEffect(() => {
      // Perform actions when formSubmitted changes
      if (formSubmitted) {
        // Trigger any logic needed in response to the form submission
        // For example, refetch data or update internal state
        console.log('Form submitted. Recompose Gallery.');
        fetchGallery()
      }
    }, [formSubmitted]);



  return (
    <div className='gallery-section'>
      <div className="gallery-header">
        <Dropdown  onSelect={handleDropdownSelect}>
          <Dropdown.Toggle className="filter-dropdown" variant="success" id="dropdown-basic">
            FILTERS
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
        <ImageList imageList={galleryImages} FilteringOption={filteringOption} BASE_URL={BASE_URL}/>

      </div>
    </div>
  );
};

export default ShowGallery;
