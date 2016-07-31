var redis = require('redis');
var Queue = require('./queue.js');

var client = redis.createClient();
var jobsQueue = new Queue('jobs', client);

function createJob(req, res) {
  var job = req.body.endpoint;
  jobsQueue.push(JSON.stringify(job));

  res.send('ok\n');
}

module.exports = createJob;
