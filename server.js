'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./routes/api.routes');
const port = process.env.PORT || 3000;

// Configurations
require('./config/db.config');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', express.static(process.cwd() + '/public'));

// Routes
app.use('/api', apiRouter);

// We could create a new home.routes.js and home.controller.js if we had more functionalities
app.get('/', function(req, res){ res.sendFile(process.cwd() + '/views/index.html') });

app.get('*', function (req, res) { // 404 Not found
  res.status(404).json({
    'api_error': 'Endpoint not found'
  })
});

var listener = app.listen(port, function () {
  console.info('Node.js listening on port: ' + listener.address().port);
});