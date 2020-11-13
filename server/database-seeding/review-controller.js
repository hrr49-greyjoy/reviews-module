const { getObjectId } = require('mongo-seeding');

const desc = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth'];

const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodreiguez', 'Wilson'];

const recommended = [true, false];

const documents = [];

for (let i = 0; i < 101; i += 1) {
  const obj = {
    author: {
      firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    },
    _id: getObjectId(i.toString()),
    helpfuls: Math.floor(Math.random() * (1000)),
    description: desc.substring(0, Math.floor(Math.random() * 200) + 1),
    tagline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    dateAdded: Date.now(),
    recommended: recommended[Math.floor(Math.random() * 2)],
  };
  documents.push(obj);
}

const data = [
  {
    model: 'review',
    documents,
  },
];

module.exports = data;
