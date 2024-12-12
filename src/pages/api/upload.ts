import { NextApiRequest, NextApiResponse } from 'next';
import { uploadImage, deleteImage } from '@/server/cloudinary';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { file, folder } = req.body;
      const imageUrl = await uploadImage(file, folder);
      res.status(200).json({ url: imageUrl });
    } catch {
      res.status(500).json({ error: 'Failed to upload image' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { publicId, folder } = req.body;
      await deleteImage(publicId, folder);
      res.status(200).json({ message: 'Image deleted successfully' });
    } catch {
      res.status(500).json({ error: 'Failed to delete image' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
