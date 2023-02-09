
import React, { useState } from "react";
import Axios from "axios"
import { Image } from 'cloudinary-react'
import {CloudinaryAPIKey, CloudinarySecretKey} from '../../env'
import {
  TextField,
  Button,
  OutlinedInput
} from "@mui/material";

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedPublicId, setSelectedPublicId] = useState("")

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedImage)
    formData.append("upload_preset", "jeux3vde")

    console.log("/////selectedImage/////:", selectedImage)
    // console.log("/////formdata/////:", formData)
    // console.log("/////formdata.append/////:", formData.get())

    Axios.post(
      "https://api.cloudinary.com/v1_1/dm8eizfpl/image/upload", formData
    ).then(res => {
       console.log("/////RES/////:", res.data)
      setSelectedPublicId(res.data.public_id)
    })

  };

  return (
    <div>
      <OutlinedInput
        type="file"
        onChange={(event) => setSelectedImage(event.target.files[0])}
      />
      <Button varient="outlined" onClick={handleUpload}> Upload </Button>

      <Image
        cloudName="dm8eizfpl"
        publicId={selectedPublicId}
        objectFit="fill"
        // width="320px"
        height="213px"
        // borderRadius="0.6rem 0.6rem .6rem"
        // objectFit="cover"
      />

    </div>
  )
}

export default Upload;
