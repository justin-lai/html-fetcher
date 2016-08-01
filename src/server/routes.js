import express from 'express';
import { createJob, getJobStatus, goToSite, changeWorkerFrequency } from './utils/api-helpers.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.html')
});


router.get('/jobs/:id', getJobStatus);
router.post('/jobs', createJob);

router.get('/redirect/:id', goToSite);

router.post('/worker', changeWorkerFrequency);

router.get('/*', (req, res) => {
  res.redirect('/');
})

module.exports = router;