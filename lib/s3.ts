import AWS from 'aws-sdk';

export async function uploadToS3(file: File) {
  try {
    const s3Bucket = process.env.NEXT_PUBLIC_S3_BUCKET;

    if (!s3Bucket) {
      throw new Error('S3 Bucket name is undefined');
    }

    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
      region: 'ap-south-1',
    });

    const s3 = new AWS.S3();

    const fileKey = 'uploads/' + Date.now().toString() + file.name.replace(" ", "_");

    const params = {
      Bucket: s3Bucket,
      Key: fileKey,
      Body: file,
    };

    const upload = s3.putObject(params).on('httpUploadProgress', evt => {
      console.log('uploading to S3', parseInt(((evt.loaded * 100) / evt.total).toString()) + "%");
    }).promise();

    await upload.then(data => {
      console.log('Successful upload', fileKey);
    });

    return Promise.resolve({ fileKey, fileName: file.name });

  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export function getS3Url(fileKey: string) {
  const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET}.s3.ap-south-1.amazonaws.com/${fileKey}`;
  return url;
}
