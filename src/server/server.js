const express = require('express');
const bodyParser = require('body-parser');
const createJob = require('./utils/job-helpers.js');
const runJobs = require('./utils/job-runner.js');
const routes = require('./routes.js')
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname + '/../client')));

app.use('/', routes);
// Listen on port 8000 for `POST` requests at the `/jobs` url path
app.post('/jobs', createJob);

app.listen(8000, serverMessage);

runJobs();

const serverMessage = () => {
  console.log('listening on 8000');
}