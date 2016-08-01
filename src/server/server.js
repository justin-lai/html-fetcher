import express from 'express';
import bodyParser from 'body-parser';
import { setWorkerFrequency } from './utils/job-runner.js';
import routes from './routes.js'
import path from 'path';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname + '/../client')));

app.use('/', routes);

app.listen(8000, serverMessage);

// initializes worker to run every 5 seconds
setWorkerFrequency(5000);

const serverMessage = () => {
  console.log('listening on 8000');
}
