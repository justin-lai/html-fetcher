require('isomorphic-fetch');

export const getJobStatus = (id, cb) => {
  fetch(`/jobs/${id}`, { credentials: 'same-origin' })
  .then(response => {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
  })
  .then(status => {
    console.log(`JOB_ID-${id} is ${status ? 'ready' : 'not ready'}`);
    if (cb) cb(status)
  })
};

export const addJobToQueue = (data, cb) => {
  fetch('/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
  })
  .then(data => {
    console.log(`URL queued at JOB_ID-${data.jobId}`);
    if (cb) cb(data);
  })
};

// export const changeWorkerFrequency = freq => {
//   fetch('/jobs', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     credentials: 'same-origin',
//     body: JSON.stringify({ freq: freq })
//   })
//   .then(response => {
//     if (response.status >= 400) {
//       throw new Error("Bad response from server");
//     } else {
//       console.log(`Worker frequency updated to ${freq} ms`);
//     }
//   })
// }