import redis from 'redis';
import Queue from './queue.js';
import Cache from './cache.js';
import request from 'request';

let jobId = 0;
const client = redis.createClient();
const jobQueue = new Queue('jobs', client);

export const createJob = (req, res) => {
  let job = req.body.url;
  jobQueue.push(jobId);
  
  const urlCache = new Cache(`jobId-${jobId}`, client);
  urlCache.set({
    url: job,
    html: '',
    completed: false
  });
  jobId++;

  res.send('ok\n');
}