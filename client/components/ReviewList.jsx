import React from 'react';
import PropTypes from 'prop-types';
import Review from './Review';

const ReviewList = (props) => {
  const { reviews } = props;
  return (
    <div>
      {reviews.map((review) => (<Review review={review} key={review.id} />))}
    </div>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.element.isRequired,
};

export default ReviewList;
