const express = require('express');
const port = process.env.PORT || '3000';

const app = express();

app.get('/foo', (req, res) => {
  res.send('bar');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
