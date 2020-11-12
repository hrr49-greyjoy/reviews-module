const path = require('path');
const AWS = require('aws-sdk');
const Promise = require('bluebird');

AWS.config.loadFromPath(path.resolve(__dirname, '../../config.json'));

const s3 = new AWS.S3();
s3.listObjectsAsync = Promise.promisify(s3.listObjects);
s3.getObjectAsync = Promise.promisify(s3.getObject);

module.exports = {
  getImages: (cb) => s3.listObjectsAsync({ Bucket: 'fec-storage' }, (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      const photos = data.Contents.map((photo) => s3.getObjectAsync({ Bucket: 'fec-storage', Key: photo.Key }));
      cb(null, photos);
    }
  }),
};
