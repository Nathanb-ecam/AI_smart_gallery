import React, { useState } from 'react';

function SendImageForm(){
  
  const BASE_URL = "http://localhost:8000/api"

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

        // Adjust the API endpoint accordingly
        const response = await fetch(BASE_URL+"/makeImagePrediction", {
            method: 'POST',
            body: formData,
          //   headers: {
          //     'Content-Type': 'image/jpg', // Set the content type
              
          // },
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Upload successful:', data);
      } else {
        console.error('Error reading answer:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className='upload-section'>
      <h2>Ajouter une image</h2>
      <div className="image-upload-form">
        <input className="file-upload" type="file" onChange={handleImageChange} required/>
        <button onClick={handleUpload}>Enregistrer l'image</button>
      </div>
    </div>
  );
};

export default SendImageForm;
