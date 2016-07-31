const redis = require('redis');
const Queue = require('./queue.js');

const client = redis.createClient();
const jobsQueue = new Queue('jobs', client);

export default const runJobs = () => {
  jobsQueue.pop(function (err, replies) {
    if (err) throw new Error(err);

    console.log(replies);
    runJobs();
  });
};
