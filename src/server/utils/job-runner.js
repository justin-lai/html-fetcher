var redis = require('redis');
var Queue = require('./queue.js');

var client = redis.createClient();
var jobsQueue = new Queue('jobs', client);

function runJobs () {
  jobsQueue.pop(function (err, replies) {
    if (err) throw new Error(err);

    console.log(replies);
    runJobs();
  });
} 

module.exports = runJobs;