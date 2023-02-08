import React, { useState } from "react";
import { CloudinaryContext, Image, Transformation, ImageUpload } from 'cloudinary-react'
import {CloudinaryAPIKey, CloudinarySecretKey} from '../../env'

const Upload = () => {
  const [image, setImage] = useState(null);

  const handleUpload = (event) => {
    // const formData = new Formdata()
    setImage(URL.createObjectURL(event.target.files[0]))
  };
  
  const handleImageUpload = (data) => {
    setImage(data.secure_url);
  }
  
  return (
    <CloudinaryContext cloudName="dm8eizfpl">
      <div>
        <input type="file" onChange={handleUpload}/>
        {image && (
          <ImageUpload 
            publicId={image}
            onSuccess={handleImageUpload}
            cloudName="dm8eizfpl"
            apiKey={CloudinaryAPIKey}
            apiSecret={CloudinarySecretKey}
          >
            <Image publicId={image}>
              <Transformation crop="scale" />
            </Image>
          </ImageUpload>
        )}
      </div>
    </CloudinaryContext>
  )
}

export default Upload;

