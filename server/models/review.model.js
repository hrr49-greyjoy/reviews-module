const mongoose = require('mongoose');

let { Schema } = mongoose.Schema;
Schema = mongoose.Schema;

const reviewSchema = Schema({
  author: {
    firstName: String,
    lastName: String,
  },
  helpfuls: Number,
  description: String,
  tagline: String,
  dateAdded: Date,
  recommended: String,
  images: Object,
  profilePic: String,
  siteId: Number,

});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
