const mongoose = require('mongoose');
const Review = require('../models/review.model.js');

mongoose.connect('mongodb://100.27.26.88:27017/reviews');

module.exports = {
  getReviewData: (id) => Review.find({ siteId: id }).then((reviews) => reviews),
};
