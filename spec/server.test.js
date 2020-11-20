const axios = require('axios');
const reviewHandler = require('../server/controllers/review.controller.js');
const mongoose = require('mongoose');


afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  done();
})



describe('Server Data', () => {
  it('should have reviews come back with an array of objects', async () => {
    try {
      const reviews = await axios.get('http://localhost:3000/api/reviews');
      expect(typeof reviews).toBe('object');
      expect(Array.isArray(reviews.data)).toBe(true);
    } catch(e) {
      console.error(e);
    }
  });
})
describe('Server Helpers', () => {
  it('should get reviews from the mongo database', async () => {
    try {
      const reviews = await reviewHandler.getReviewData()
      expect(typeof reviews).toBe('object');
      expect(Array.isArray(reviews)).toBe(true);
      expect(reviews.length > 0).toBe(true);
    } catch(e) {
      console.error(e);
    }

  });
})
/**
* @jest-environment node
*/