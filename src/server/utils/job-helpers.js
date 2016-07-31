const redis = require('redis');
const Queue = require('./queue.js');

const client = redis.createClient();
const jobsQueue = new Queue('jobs', client);

export default const createJob = (req, res) => {
  let job = req.body.endpoint;
  jobsQueue.push(JSON.stringify(job));

  res.send('ok\n');
}
