import cloudinary from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

const mycloud = cloudinary.v2;
mycloud.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_SECRET,
});

export const imageUpload = async (file) => {
  const result = await mycloud.uploader.upload(file, { resource_type: "auto" });
  return result;
};

const storage = multer.memoryStorage();
export const upload = multer(storage);
