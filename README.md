# html-fetcher
REST-ful API to store and retrieve HTML using a Redis job queue and URL cache

Currently deployed on [DigitalOcean](http://159.203.234.212:8000/).

# API
Pushes a URL to the current job queue
```
curl --data "url=www.somesite.com" http://159.203.234.212:8000/jobs
```
Retrieves the current status of a task given a Job ID (ex. 8) 
```
curl http://159.203.234.212:8000/jobs/8
```
Redirects to the HTML retrieved for a given Job ID (ex. 4)
```
curl http://159.203.234.212:8000/redirect/4
```
Modifies the frequency of the worker processing the job queue (default 5000 ms)
```
curl --data "freq=30000" http://159.203.234.212:8000/worker
```

# Build tools
```
- "dev-client": bundles public files w/ ES6 transpilation 
- "start": starts server for development
- "build": precompiles assets
- "serve": starts server for production
```
