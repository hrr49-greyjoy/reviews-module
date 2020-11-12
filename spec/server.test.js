const axios = require('axios');

jest.mock(axios);

test('Jest has been implemented correctly.', () => {
  expect(1 + 2).toBe(3);
});

test('Getting reviews from the server', () => {

});
