import redis from 'redis';
import Queue from './queue.js';
import request from 'request';

const client = redis.createClient();
const jobsQueue = new Queue('jobs', client);

export const runJobs = () => {
  jobsQueue.pop(function (err, job) {
    if (err) throw new Error(err);

    console.log(job);
    request('http://' + job, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body) // Show the HTML for the Google homepage. 
      }
    })

    runJobs();
  });
};



