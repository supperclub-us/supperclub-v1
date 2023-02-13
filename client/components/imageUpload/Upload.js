
import React, { useState } from "react";
import Axios from "axios"
// import {CloudinaryAPIKey, CloudinarySecretKey} from '../../env'
import {
  Button,
  OutlinedInput
} from "@mui/material";
import UploadIcon from '@mui/icons-material/Upload';
import "./upload.css";

const Upload = ({setImageUrl}) => {
  const [selectedImage, setSelectedImage] = useState("");


  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedImage)
    formData.append("upload_preset", "jeux3vde")

    Axios.post(
      "https://api.cloudinary.com/v1_1/dm8eizfpl/image/upload", formData
    ).then(res => {
      setImageUrl(res.data.url)
    })
  };

  return (
    <div className="upload-container">
      <OutlinedInput
        type="file"
        onChange={(event) => setSelectedImage(event.target.files[0])}
        className="upload-input"
      />
      <Button 
        className="upload-button" 
        variant="contained" 
        onClick={handleUpload} 
        startIcon={<UploadIcon />}
        sx={{
          "&:hover": { backgroundColor: "#EB5757", color: "whitesmoke" },
          backgroundColor: "#EB5757",
          color: "whitesmoke",
        }}
      > 
        Upload </Button>
    </div>
  )
}

export default Upload;
