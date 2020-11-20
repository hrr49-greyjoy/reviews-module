import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewList from './ReviewList';

const App = () => {
  const [reviews, setReviews] = useState([]);
  // const [image, setImage] = useState('');
  useEffect(() => {
    axios.get('/api/reviews').then((reviewData) => {
      setReviews(reviewData.data);
    }).catch((e) => axios.get('http://localhost:3000/api/reviews').then((reviewData) => {
      setReviews(reviewData.data);
      // eslint-disable-next-line no-console
      console.error(e);
    }));
  }, []);
  return (
    <div>
      <ReviewList reviews={reviews} />
      {/* <img src={`data:image/png;base64,${image}`} alt="Procedurally Generated" /> */}
    </div>
  );
};

export default App;
