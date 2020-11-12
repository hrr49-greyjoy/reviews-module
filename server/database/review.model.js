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
  recommended: Boolean,

});

const review = mongoose.model('review', reviewSchema, 'Review');
module.exports = review;
