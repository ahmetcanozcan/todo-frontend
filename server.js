const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan());

app.use(express.static('dist'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


