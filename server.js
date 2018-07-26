const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./server/router');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 8080;

app.use(morgan('combined'))

app.use(express.static(__dirname + '\\client\\build\\'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

router(app);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '\\client\\build\\', 'index.html'));
});

app.listen(port, () => {
  console.log('Server started');
});