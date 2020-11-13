const { getObjectId } = require('mongo-seeding');

const AWS = require('aws-sdk');

const path = require('path');

const desc = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth'];

const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodreiguez', 'Wilson'];

const recommended = [true, false];

const documents = [];

AWS.config.loadFromPath(path.resolve(__dirname, '../../config.json'));

const s3 = new AWS.S3();
const promise = s3.listObjectsV2({ Bucket: 'fec-storage' }).promise();

module.exports.getData = () => {
  let imageURLS = [];
  return promise.then((data) => {
    imageURLS = data.Contents.map((image) => `https://fec-storage.s3.us-east-2.amazonaws.com/${image.Key}`);
    for (let i = 0; i < 101; i += 1) {
      const obj = {
        author: {
          firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
          lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
        },
        _id: getObjectId(i.toString()),
        helpfuls: Math.floor(Math.random() * (1000)),
        description: desc.substring(0, Math.floor(Math.random() * 200) + 1),
        tagline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        dateAdded: Date.now(),
        recommended: recommended[Math.floor(Math.random() * 2)],
        images: imageURLS.slice(Math.floor(Math.random() * imageURLS.length),
          Math.floor(Math.random() * imageURLS.length) + 1),
      };
      documents.push(obj);
    }
    const exportData = [
      {
        model: 'Review',
        documents,
      },
    ];
    return exportData;
  });
};
