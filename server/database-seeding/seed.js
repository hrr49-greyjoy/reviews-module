const path = require('path');
const Seeder = require('mongoose-seed');
const data = require('./review-controller');

const db = 'mongodb://localhost:27017/reviews';

Seeder.connect(db, () => {
  Seeder.loadModels([path.resolve(__dirname, '../models/review.model.js')]);
  Seeder.clearModels(['review'], () => {
    Seeder.populateModels(data, (err, done) => {
      if (err) {
        Seeder.disconnect();
        throw err;
      }
      Seeder.disconnect();
      return done;
    });
  });
});
