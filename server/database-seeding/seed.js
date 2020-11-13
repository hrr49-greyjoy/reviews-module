const path = require('path');
const Seeder = require('mongoose-seed');
const reviewControl = require('./review-controller');

const db = 'mongodb://localhost:27017/reviews';

Seeder.connect(db, () => {
  reviewControl.getData().then((exportData) => {
    Seeder.loadModels([path.resolve(__dirname, '../models/review.model.js')]);
    Seeder.clearModels(['Review'], () => {
      Seeder.populateModels(exportData, (err, done) => {
        if (err) {
          Seeder.disconnect();
          throw err;
        }
        Seeder.disconnect();
        return done;
      });
    });
  });
});
