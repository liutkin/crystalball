const express = require('express');
const db = require('./db');

const port = process.env.PORT || 3000;
const delay = process.env.DELAY || 0;

const app = express();

app.use((req, res, next) => {
  setTimeout(() => {
    next();
  }, delay);
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.get('/foo', (req, res) => {
  res.send(db.foo);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
