import redis from 'redis';
import Queue from './queue.js';

const client = redis.createClient();
const jobsQueue = new Queue('jobs', client);

export const createJob = (req, res) => {
  let job = req.body.url;
  jobsQueue.push(JSON.stringify(job));

  res.send('ok\n');
}

