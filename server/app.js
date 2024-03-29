const express = require('express');

const app = express();
const path = require('path');
const Promise = require('bluebird');
const bodyParser = require('body-parser');
const imageHandler = Promise.promisifyAll(require('./models/images.js'));
const reviewHandler = Promise.promisifyAll(require('./controllers/review.controller.js'));

let reviewId = 0;

require('dotenv').config();

const PORT = process.env.PORT || 3001

app.use(express.static(path.resolve(__dirname, '../client')));

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log('Listening on port 3001');
});

app.get('/api/image', (req, res) => {
  // console.log(req, res);
  console.log('Serving GET request for /api/image');
  imageHandler.getImagesAsync().then((photos) => Promise.all(photos)).then((data) => {
    res.send(data.map((buffer) => buffer.Body.toString('base64')));
  }).catch((err) => {
    console.error(err);
  });
});

app.get('/api/reviews', (req, res) => {
  console.log('Serving GET request for /api/reviews');
  reviewHandler.getReviewData(reviewId).then((data) => {
    console.log(data);
    res.send(data);
  }).catch((err) => {
    console.error(err);
  });
});

app.get('/api/reviews/:id', (req, res) => {
    console.log(reviewId);
    reviewId = req.params.id;
    console.log(reviewId);
    res.redirect('/');
})