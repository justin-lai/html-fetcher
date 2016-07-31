import express from 'express';
import { createJob, getJobStatus, goToSite } from './utils/job-helpers.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.html')
});

router.get('/jobs/:id', getJobStatus);
router.post('/jobs', createJob);

router.get('/redirect/:id', goToSite);

module.exports = router;