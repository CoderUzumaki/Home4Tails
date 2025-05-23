import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) return null;
        const result = await cloudinary.v2.uploader.upload(
            filePath,
            resource_type = "auto"
        );
        console.log("File uploaded to Cloudinary!", result.url);
        return result;
    } catch (error) {
        fs.unlinkSync(filePath);
        console.error("Error uploading file to Cloudinary:- ", error);
        return null;
    }
}

export { uploadOnCloudinary };
