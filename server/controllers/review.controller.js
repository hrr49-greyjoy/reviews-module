const mongoose = require('mongoose');
const Review = require('../models/review.model.js');

mongoose.connect('mongodb://localhost/reviews');

module.exports = {
  getReviewData: () => Review.find({}).then((reviews) => reviews),
};
