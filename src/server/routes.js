import express from 'express';
import { createJob } from './utils/job-helpers.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.html')
});

router.post('/jobs', createJob);

module.exports = router;