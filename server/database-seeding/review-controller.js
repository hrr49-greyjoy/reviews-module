const { getObjectId } = require('mongo-seeding');

const AWS = require('aws-sdk');

const path = require('path');

const faker = require('faker');

const recommended = ['Yes', 'No', 'Neutral'];

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
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        },
        _id: getObjectId(i.toString()),
        helpfuls: Math.floor(Math.random() * (1000)),
        description: faker.lorem.paragraph(),
        tagline: faker.lorem.sentence(),
        dateAdded: faker.date.between('2015-01-01', '2020-01-08'),
        recommended: recommended[Math.floor(Math.random() * 3)],
        images: imageURLS.slice(Math.floor(Math.random() * imageURLS.length),
          Math.floor(Math.random() * imageURLS.length) + 1),
        profilePic: faker.image.avatar(),
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
