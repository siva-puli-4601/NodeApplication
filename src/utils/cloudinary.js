// // const express = require("express");
// import multer from "multer";
// import dotenv from "dotenv";
// import cloudinary from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";


// dotenv.config(); // Load environment variables

// const { v2: cloudinaryV2 } = cloudinary;


// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// // Configure Multer Storage for Images & PDFs
// const storage = new CloudinaryStorage({

//   cloudinary: cloudinary,
//   params: async (req, file) => {
//     let folder = "uploads";
//     let resourceType = "image"; // Default to image

//     if (file.mimetype === "application/pdf") {
//       folder = "pdfs"; // Store PDFs in a separate folder
//       resourceType = "raw"; // Cloudinary processes PDFs as raw files
//     }
//    console.log(file);
//     return {
//       folder: folder,
//       format: file.mimetype === "application/pdf" ? "pdf" : "jpg",
//       resource_type: resourceType,
//       public_id: Date.now() + "-" + file.originalname,
//     };
//   },
// });

// // Multer Upload Middleware
// export const upload = multer({ storage });


import cloudinaryPkg from "cloudinary";
import fs from 'fs'

const { v2: cloudinary } = cloudinaryPkg;

cloudinary.config({
  cloud_name:'dmfbqzpul',
  api_key: '597249774826114',
  api_secret: 'b7IODlFVIMbFngqniHMX9oos2S0'
});

const uploadFile=async (filepath)=>
{
    console.log(process.env.CLOUDINARY_NAME)
    console.log(process.env.CLOUDINARY_API_KEY)
    console.log(process.env.CLOUDINARY_API_SECRET)
   try{
    if (!filepath || !fs.existsSync(filepath)) {
        console.error("File does not exist:", filepath);
        return null;
      }
    
    const result = await cloudinary.uploader.upload(filepath, {
        resource_type: "auto", // Ensure this is lowercase
      });
      console.log("file path",result.url); 
    fs.unlinkSync(filepath) 
    
    return result.url;
    
   }
   catch(err)
   {
     console.log(err)
     fs.unlinkSync(filepath)
     return null;
   }
}

export {uploadFile}

