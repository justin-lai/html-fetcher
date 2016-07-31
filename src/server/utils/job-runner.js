import redis from 'redis';
import Queue from './queue.js';
import Cache from './cache.js';
import request from 'request';

const client = redis.createClient();
const jobQueue = new Queue('jobs', client);

export const runJobs = () => {
  jobQueue.pop(function (err, job) {
    if (err) throw new Error(err);

    const jobId = job[1];
    const urlCache = new Cache(`jobId-${jobId}`, client);
    const urlBody;
    urlCache.get((err, data) => {
      urlBody = data.url;
    })

    request(`http://${urlBody}`, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        urlCache.set({
          url: urlBody,
          html: html,
          completed: true
        });
      }
    })

    runJobs();
  });
};



