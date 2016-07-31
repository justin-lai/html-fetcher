import express from 'express';
import bodyParser from 'body-parser';
import { runJobs } from './utils/job-runner.js';
import routes from './routes.js'
import path from 'path';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname + '/../client')));

app.use('/', routes);
// Listen on port 8000 for `POST` requests at the `/jobs` url path

app.listen(8000, serverMessage);

runJobs(); 

const serverMessage = () => {
  console.log('listening on 8000');
}
