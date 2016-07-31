import redis from 'redis';
import Queue from './queue.js';
import Cache from './cache.js';
import request from 'request';

let jobId = 0;
const client = redis.createClient();
const jobQueue = new Queue('jobs', client);

export const createJob = (req, res) => {  
  jobQueue.push(jobId);

  client.set(`jobId-${jobId}`, req.body.url);
  // const urlCache = new Cache(`jobId-${jobId}`, client);
  const urlData = {
    url: req.body.url,
    html: '',
    completed: false
  }
  // urlCache.set(urlData);

  urlData.jobId = jobId++;
  res.send(JSON.stringify(urlData));

  // send a different status if job does not meet reqs
}

export const getJobStatus = (req, res) => {
  const id = req.params.id;
  // const urlCache = new Cache(`jobId-${id}`, client);
  client.get(`jobId-${id}`, (err, url) => {
    if (err) {
      res.status(400);
    } else {
      client.exists(url, (error, reply) => {
        res.send(!!reply);
      });
    };
  })
  // urlCache.get((err, data) => {
  //   if (err) {
  //     res.sendStatus(400)
  //   } else {
  //     res.send(data.completed)
  //   };
  // })
}

export const goToSite = (req, res) => {
  const id = req.params.id;

  client.get(`jobId-${id}`, (err, url) => {
    if (err) {
      res.status(400);
    } else {
      client.get(url, (error, html) => {
        if (error) {
          res.status(400);
        } else {
          console.log(html);
          res.send(html);
        }
      })
    };
  })
}