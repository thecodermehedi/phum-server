import fs from 'fs';
import config from '../config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});

const sendPhotoToCloudinary = async (
  name: string,
  path: string,
): Promise<Record<string, unknown>> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(path, { public_id: name.trim() }, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result as UploadApiResponse);
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`${path} is deleted`);
        }
      });
    });
  });
};

export default sendPhotoToCloudinary;
