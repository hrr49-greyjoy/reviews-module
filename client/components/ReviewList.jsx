/* eslint-disable no-loop-func */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from 'react-icons/io';
import {
  FaRegThumbsUp, FaPinterest, FaFacebook, FaTwitter, FaLink,
} from 'react-icons/fa';

import Review from './Review';

const ReviewList = (props) => {
  const { reviews } = props;
  const [filter, setFilter] = useState('Best');
  const [reviewList, setReviewList] = useState(reviews);
  const [modalToggle, toggleModal] = useState(false);
  const [selectedImageIndex, changeImage] = useState(0);
  const [images, changeImages] = useState([]);

  const Line = styled.div`
  border-bottom: 0.1em solid #ebebeb;
  margin-left: 6.5em;
  max-width: 52%;
  `;
  const HeadingContainer = styled.div`
  display: flex;
  margin-left: 6.5em;
  justify-content: space-between;
  align-items: center;
  max-width: 52%;
  font-family: "Calibre";
  `;
  const Subheading = styled.p`
  font-weight: bold;
  font-family: "Calibre";
  display: inline-block;
  `;
  const FilterLink = styled.a`
  text-decoration: none;
  border-bottom: 1px solid #ebebeb;
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    border-color: #333333;
  }
  `;
  const Filter = styled.div`
  display: flex;
  color: #757575;
  `;
  const Space = styled.p`
  margin: 0 .2em 0 .2em;
  display: inline-block;
  `;
  const Bold = styled.p`
  font-weight: bold;
  color: #333333;
  margin: 0;
  `;
  const ModalContainer = styled.div`
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.92);
  font-family: "Calibre";
  `;

  const LeftArrow = styled.div`
  color: #ededed;
  top: 50%;
  display: block;
  float: left;
  position: absolute;
  z-index: 2;
  &:hover {
    cursor: pointer;
  }
  `;
  const RightArrow = styled.div`
  color: #ededed;
  top: 50%;
  left: 97%;
  display: block;
  float: right;
  position: absolute;
  z-index: 2;
  &:hover {
    cursor: pointer;
  }
  `;
  const Image = styled.img`
    max-height: 75%;
    max-width: 75%;
    width: auto;
    height: auto;
    margin-left: auto;
    margin: 2% auto auto auto;
    display: block;
  `;
  const AuthorInformation = styled.div`
  max-width: 58%;
  margin: 1% auto 1% auto;
  z-index: 2;
  display: grid;
  grid-template: 4fr 1fr / 3fr auto;
  `;
  const ProfilePicture = styled.img`
  height:50px;
  width:50px;
  border-radius:50%;
  justify-self: start;
  align-self: start;
  `;
  const CloseContainer = styled.div`
  float: right;
  color: #ededed;
  margin-top: 0.5em;
  margin-right: 0.5em;
  &:hover {
    cursor: pointer;
  }
  `;
  const AuthorName = styled.h1`
  display: inline-block;
  color: #ededed;
  margin: 0;
  margin-left:0.4em;
  `;
  const NameAndDate = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  `;
  const ReviewDate = styled.p`
  margin: 0;
  font-size: 0.7em;
  color: #5c5c5c;
  margin-left:1.4em;
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
  const IconList = styled.div`
  display: flex;
  grid-area: 2 / 2 / 2 / 2;
  align-items: center;
  justify-content: space-between;
  color: #ededed;
  `;

  const setImages = () => {
    const mappedImages = reviews.map((x) => (x.images.map((y, i) => {
      if (typeof y === 'string') {
        return {
          url: y, userPic: x.profilePic, author: x.author, index: i, date: x.dateAdded,
        };
      }
      return {
        url: y.url, userPic: x.profilePic, author: x.author, index: i, date: x.dateAdded,
      };
    })));
    let newReviewList = [];
    let counter = -1;
    for (let i = 0; i < reviews.length; i += 1) {
      reviews[i].images = reviews[i].images.map((z) => {
        counter += 1;
        if (typeof z === 'string') {
          return { url: z, index: counter };
        }
        return { url: z.url, index: counter };
      });
    }
    newReviewList = reviews;
    const flatImages = mappedImages.flat();
    changeImages(flatImages);
    setReviewList(newReviewList);
  };

  const revealModal = (toggle, index) => {
    changeImage(index);
    toggleModal(toggle);
  };

  const sortReviews = (filterText) => {
    if (filterText === 'Best') {
      setReviewList(reviews.sort((first, second) => second.helpfuls - first.helpfuls));
    } else if (filterText === 'Recent') {
      setReviewList(reviews.sort((first, second) => {
        if (first.dateAdded > second.dateAdded) {
          return -1;
        }
        return 1;
      }));
    }
    setImages();
    setFilter(filterText);
  };

  useEffect(() => {
    sortReviews('Best');
  }, [reviews]);
  return (
    <div>
      { modalToggle === true ? (
        <>
          <ModalContainer>
            <CloseContainer>
              <IoMdClose size={25} onClick={() => toggleModal(false)} />
            </CloseContainer>
            <AuthorInformation>
              <NameAndDate>
                <ProfilePicture src={images[selectedImageIndex].userPic} />
                <div>
                  <AuthorName>{`${images[selectedImageIndex].author.firstName} ${images[selectedImageIndex].author.lastName.substring(0, 1)}.`}</AuthorName>
                  <ReviewDate>{`Posted on ${new Intl.DateTimeFormat('en-us', { dateStyle: 'medium' }).format(new Date(images[selectedImageIndex].date))}`}</ReviewDate>
                </div>
              </NameAndDate>
              <Helpfuls type="button">
                <FaRegThumbsUp />
                <p><strong>Helpful</strong></p>
                0
              </Helpfuls>
              <IconList>
                <FaPinterest />
                <FaFacebook />
                <FaTwitter />
                <FaLink />
              </IconList>
            </AuthorInformation>
            <LeftArrow>
              <IoIosArrowBack size={50} onClick={() => changeImage(selectedImageIndex - 1)} />
            </LeftArrow>
            <Image src={images[selectedImageIndex].url} />
            <RightArrow>
              <IoIosArrowForward size={50} onClick={() => changeImage(selectedImageIndex + 1)} />
            </RightArrow>
          </ModalContainer>
        </>
      ) : (<></>) }
      <Line />
      <HeadingContainer>
        <div>
          <Subheading>
            {reviews.length}
          </Subheading>
          <Space> </Space>
          <Subheading>
            Written Reviews
          </Subheading>
        </div>
        <Filter>
          <FilterLink onClick={() => sortReviews('Recent')}>{filter === 'Recent' ? (<Bold>Recent</Bold>) : (<>Recent</>)}</FilterLink>
          <Space>/</Space>
          <FilterLink onClick={() => sortReviews('Best')}>{filter === 'Best' ? (<Bold>Best</Bold>) : (<>Best</>)}</FilterLink>
        </Filter>
      </HeadingContainer>
      {reviewList.map((review) => (
        <Review
          review={review}
          key={review.id}
          onImageClick={(param, index) => revealModal(param, index)}
          images={review.images.map((y, i) => ({
            url: y,
            userPic: review.profilePic,
            author: review.author,
            index: i,
            date: review.dateAdded,
          }))}
        />
      ))}
    </div>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.element.isRequired,
};

export default ReviewList;
