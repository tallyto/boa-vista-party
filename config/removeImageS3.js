const aws = require('aws-sdk');

const s3 = new aws.S3(
  {
    accessKeyId: 'AKIAVHKUOQJ4DWASD7F5',
    secretAccessKey: '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',
    region: 'sa-east-1',
  },
);

module.exports = function removeImageS3(key) {
  s3.deleteObject({
    Bucket: 'upload-party',
    Key: key,
  }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
};
