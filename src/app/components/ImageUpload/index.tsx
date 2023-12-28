import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: String(process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID),
    secretAccessKey: String(process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY),
  },
});

export async function uploadImage(image: File) {
  const file = image;

  if (!file) {
    throw new Error('No file uploaded');
  }

  const key = `${new Date().getTime()}-${file.name}`;
  const putCommand = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    Key: key,
    Body: file,
  });

  await s3.send(putCommand);

  return `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;
}
