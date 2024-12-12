import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET?.trim(),
});

export async function uploadImage(file: File, folder: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `${file.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix}`;

  const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { public_id: `${folder}/${filename}`, resource_type: 'image', overwrite: true },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result as { secure_url: string });
        }
      }
    );
    stream.end(buffer);
  });

  return uploadResult.secure_url;
}

export async function deleteImage(publicId: string, folder: string): Promise<void> {
  await cloudinary.uploader.destroy(`${folder}/${publicId}`).catch((err) => {
    console.error(`Failed to delete image from Cloudinary: ${err}`);
  });
}
