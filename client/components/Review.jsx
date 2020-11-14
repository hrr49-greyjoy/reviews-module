import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaRegThumbsUp, FaRegFlag, FaRegMeh } from 'react-icons/fa';
import { HiThumbUp, HiThumbDown } from 'react-icons/hi';

const Review = (props) => {
  const { review } = props;
  const renderedImages = review.images.slice(0, 9);
  const iconChoices = {
    Yes: [<HiThumbUp size={14} />, '#40d9ac', 'recommends'],
    No: [<HiThumbDown size={14} />, '#757575', 'does\'nt recommend'],
    Neutral: [<FaRegMeh size={14} />, '#757575', 'has mixed feelings towards'],
  };
  const Image = styled.img`
    max-width: 8em;
    max-height: 8em;
    width: 5em;
    height: 5em;
    border-radius: 10%;
    margin-right: 0.7em;
    margin-bottom: 0.7em;
  `;
  const ImageContainer = styled.div`
    display: flex;
    margin: 0;
    flex-wrap: wrap;
    align-items: space-between;
    width: 20em;
  `;
  const ProfilePicture = styled.img`
  height:60px;
  width:60px;
  border-radius:50%;
  align-self: center;
  justify-self: center;
  `;
  const ReviewSection = styled.div`
  font-family: "Calibre", Calibri, Helvetica, Arial, sans-serif;
  font-size: 1.3em;
  display: flex;
  flex-direction: column;
  margin: 1em 10em 1em 5em;
  width: 80%;
  `;
  const Line = styled.div`
  border-bottom: 0.1em solid #ebebeb;
  width: 72%;
  margin-left: 11em;
  `;

  const AuthorInformation = styled.div`
  display: flex;
  height: auto;
  width: auto;
  `;
  const ReviewBody = styled.div`
  margin-left: 4.5em;
  font-size: 0.8em;
  width: auto;
  `;
  const Tagline = styled.h1`
  align-self: center;
  justify-self: center;
  color: #2e2e2e;
  font-size: 1.1em;
  margin-left: .6em;
  `;
  const DateTime = styled.p`
  color: #757575;
  margin-bottom: 0;
  font-size: 0.8em;
  display: inline-block;
  margin-left: auto;
  margin-top: 0;
  `;
  const Recommendation = styled.div`
  margin-bottom: 0;
  margin-top: 0;
  display: flex;
  `;
  const IconContainer = styled.div`
  background-color: ${iconChoices[review.recommended][1]};
  height: 1.0em;
  width: 1.0em;
  font-size: 1.3em;
  border-radius: 50%;
  color: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
  `;
  const Helpfuls = styled.button`
  background-color: #40d9ac;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fafafa;
  height: 3em;
  width: 7.5em;
  font-weight: 600;
  font-size:0.9em;
  transition: 0.4s;
  &:hover {
    background-color: #3cc69e;
    cursor: pointer;
    border: none;
  };
  `;

  const Subheading = styled.strong`
  align-self: flex-start;
  margin-left: 0.2em;
  `;
  const Paragraph = styled.p`
  display: inline;
  margin: 0;
  padding-left: 0.3em;
  `;
  const Report = styled.a`
  text-decoration: none;
  align-self: center;
  margin-left: auto;
  font-size: 0.8em;
  transition: 0.4s;
  visibility: hidden;
  opacity: 0;
  color: #757575;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
    color: #40d9ac;
  };
  `;

  const HelpfulsContainer = styled.div`
  display: flex;
  transition: visibility 0s, opacity 0.5s, linear;
  &:hover ${Report} {
    visibility: visible;
    opacity: 1;
  }
  `;

  return (
    <>
      <Line />
      <ReviewSection>
        <AuthorInformation>
          <ProfilePicture src={review.profilePic} />
          <Tagline>{review.tagline}</Tagline>
        </AuthorInformation>
        <ReviewBody>
          <Recommendation>
            <IconContainer>
              {
                iconChoices[review.recommended][0]
              }
            </IconContainer>
            <Subheading>{`${review.author.firstName} ${review.author.lastName.substring(0, 1)}.  `}</Subheading>
            <Paragraph>
              {iconChoices[review.recommended][2]}
              <Paragraph />
              this listing.
            </Paragraph>
            <DateTime>{new Intl.DateTimeFormat('en-us', { dateStyle: 'medium' }).format(new Date(review.dateAdded))}</DateTime>
          </Recommendation>
          <div className="review-information">
            <p className="description">{review.description}</p>
          </div>
          {
          renderedImages.length > 0
            ? (
              <ImageContainer>
                {renderedImages.map((image) => <Image src={image} alt={image.substring(image.indexOf('amazonaws.com/') + 14)} />)}
              </ImageContainer>
            ) : (<></>)
          }
          <HelpfulsContainer>
            <Helpfuls type="button">
              <FaRegThumbsUp />
              <p><strong>Helpful</strong></p>
              {`${review.helpfuls}`}
            </Helpfuls>
            <Report>
              <FaRegFlag size={12} />
              <Paragraph />
              Report
            </Report>
          </HelpfulsContainer>
        </ReviewBody>
      </ReviewSection>
    </>
  );
};
Review.propTypes = {
  review: PropTypes.element.isRequired,
};
export default Review;
