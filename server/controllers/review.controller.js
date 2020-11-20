const mongoose = require('mongoose');
const Review = require('../models/review.model.js');

mongoose.connect('mongodb://localhost/reviews');

module.exports = {
  getReviewData: (id) => Review.find({ siteId: id }).then((reviews) => reviews),
};
