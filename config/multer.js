/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'public', 'uploads'));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        file.key = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, file.key);
      });
    },
  }),
  s3: multerS3({
    s3: new aws.S3({
      accessKeyId: 'AKIAVHKUOQJ4DWASD7F5',
      secretAccessKey: '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',
      region: 'sa-east-1',
    }),
    bucket: 'upload-party',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, fileName);
      });
    },
  }),
};

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'public', 'uploads'),
  storage: storageTypes.s3,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  },
};
