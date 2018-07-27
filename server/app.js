const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./router');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

router(app);

app.listen(port, () => {
  console.log('Server started at', port);
});