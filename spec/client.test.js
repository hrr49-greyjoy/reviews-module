import Enzyme, { shallow, mount, render } from 'enzyme';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Review from '../client/components/Review';
import App from '../client/components/app';
import ReviewList from '../client/components/ReviewList';
import sinon from 'sinon';
import { JSDOM } from 'jsdom';
import axios from 'axios';


Enzyme.configure({ adapter: new Adapter() });

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');

const { window } = jsdom;
global.document = window.document;
global.window = window;

describe('<App />', () => {
  // console.log(JSON.stringify(App.prototype));

  const wrapper = shallow(<App />);

  it('should render one review list', async () => {
   await expect(wrapper.children().length).toBe(1);
  })

})

describe('<ReviewList />', () => {
  const wrapper = shallow(<ReviewList />);

  it('renders divs for the reviews', () => {
    expect(wrapper.html()).toContain('div');
  });
})

describe('<Review />', () => {
  let review = {"author":{"firstName":"Isadore","lastName":"McKenzie"},"_id":"cb4e5208b4cd87268b208e49","helpfuls":993,"description":"Ea corrupti officiis dignissimos exercitationem quidem. Dicta sed amet. Et cumque et quis perferendis consequuntur sint voluptates quia unde.","tagline":"Dolores debitis omnis.","dateAdded":"2018-06-18T20:48:06.404Z","recommended":"Neutral","images":[],"profilePic":"http://placeimg.com/640/480/people","__v":0}
  const wrapper = shallow(<Review onImageClick={() => 'Hi'} review={review}/>);
  it('renders a div container for the review', () => {
    expect(wrapper.html()).toContain('div');
  });

  it('renders a the profile picture for the review', () => {
    expect(wrapper.html()).toContain('img');
  });

  it('renders the correct description', () => {
    expect(wrapper.childAt(0).childAt(1).childAt(1).text()).toBe("Ea corrupti officiis dignissimos exercitationem quidem. Dicta sed amet. Et cumque et quis perferendis consequuntur sint voluptates quia unde.");
  });

  it('renders the correct recommendation, author, and date', () => {
    expect(wrapper.childAt(0).childAt(1).childAt(0).text()).toContain("Isadore M.  has mixed feelings towardsthis listing.Jun 18, 2018");
  });

  it('renders the correct tagline', () => {
    expect(wrapper.childAt(0).childAt(0).text()).toBe("Dolores debitis omnis.");
  });

})