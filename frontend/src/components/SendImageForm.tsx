import React, { useState } from 'react';
import { BASE_URL } from '../utils/constants';

interface Props{
  onSubmit:()=>void;
}


function SendImageForm({onSubmit}:Props){
  const [selectedImage, setSelectedImage] = useState(new Blob);
  // const [selectedImageLabel, setSelectedImageLabel] = useState("");

  const handleImageChange = (e:any) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
        const formData = new FormData();
        formData.append('image', selectedImage);
        // formData.append('image_label', selectedImage);

        const response = await fetch(BASE_URL+"/api/makeImagePrediction", {
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
            const result = await response.json()
            onSubmit()
            console.log('Upload successful:', result);
      } else {
        console.error('Error reading answer:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className='upload-section'>
        <input className="file-upload" type="file" onChange={handleImageChange} required/>
        <button onClick={handleUpload}>Enregistrer l'image</button>
    </div>
  );
};

export default SendImageForm;
