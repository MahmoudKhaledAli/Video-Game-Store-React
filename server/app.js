const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routers = require('./routers');
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

// app.use('/admin', routers.adminRouter);
app.use('/user', routers.userRouter);
app.use('/', routers.apiRouter);

app.listen(port, () => {
  console.log('Server started at', port);
});