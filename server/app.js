const express = require('express');

const app = express();

const path = require('path');

app.use(express.static(path.resolve(__dirname, '../client')));

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

app.get('/', (req, res) => {
  console.log(req, res);
});

