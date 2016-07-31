require('isomorphic-fetch');

export const getJob = id => {
  fetch('/jobs', { credentials: 'same-origin' })
  .then(response => {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
  });
};

export const postJob = data => {
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
    } else {
      console.log('URL added to Queue')
    }
  })
};