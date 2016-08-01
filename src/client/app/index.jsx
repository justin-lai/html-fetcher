import React from 'react';
import {render} from 'react-dom';
import { getJobStatus, addJobToQueue } from './api/helpers.js';
import JobTable from './components/JobTable.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      message: 'This is a message',
      jobs: []
    };

    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }

  handleUrlChange(e) {
    this.setState({ url: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.isValidUrl(this.state.url)) {
      addJobToQueue({ url: this.state.url }, job => {
        this.setState({ jobs: this.state.jobs.concat([job]) })
      })
    } else {
      this.setState({ message: 'Invalid URL - cannot add to queue' });
    }
  }

  updateStatus(job) {
    const status = getJobStatus(job.jobId, status => {
      if (status) {
        let newState = this.state.jobs;
        for (var i in newState) {
          if (newState[i].jobId == job.jobId) {
            newState[i].html = job.html;
            newState[i].completed = true;
            break;
          }
        }
        this.setState({ jobs: newState });
      }
    });
  }

  isValidUrl(url) {    
    const rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

    return url.match(rValidUrl);
  }

  render() {
    return (
      <div className="container">
        <h1>Coding Challenge: HTML Fetcher with Job Queue</h1>
        <div id="user-form">
          <label htmlFor="url">Enter a URL here:</label>
          <form className="url-entry-form" onSubmit={this.handleSubmit} >
            <input
              type="text"
              name="url"
              onChange={this.handleUrlChange}
              placeholder="i.e. www.google.com"></input>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div id="status-message">{this.state.message}</div>
        <JobTable jobs={this.state.jobs} updateStatus={this.updateStatus} />
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));

