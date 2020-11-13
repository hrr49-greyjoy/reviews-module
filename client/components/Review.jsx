import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Review = (props) => {
  const { review } = props;
  const renderedImages = review.images.slice(0, 3);
  const Image = styled.img`
    width: 120px;
    height: 120px;
  `;
  return (
    <div>
      <div className="author-information">
        <p>
          <strong>First Name:</strong>
          {review.author.firstName}
        </p>
        <p>
          <strong>Last Name:</strong>
          {review.author.lastName}
        </p>
      </div>
      <div className="review-information">
        <h1>{review.tagline}</h1>
        <h3>{review.dateAdded}</h3>
        <p className="description">{review.description}</p>
      </div>
      <div className="helpfuls">
        <p>
          Helpful?
          {review.helpfuls}
        </p>
      </div>
      <div className="images">
        {renderedImages.map((image) => <Image src={image} alt={image.substring(image.indexOf('amazonaws.com/') + 14)} />)}
      </div>
    </div>
  );
};
Review.propTypes = {
  review: PropTypes.element.isRequired,
};
export default Review;
