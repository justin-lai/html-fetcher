import React from 'react';
import {render} from 'react-dom';
import { getJobStatus, addJobToQueue, goToSite } from './api/helpers.js';
import JobTable from './components/JobTable.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
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
    addJobToQueue({ url: this.state.url }, job => {
      this.setState({
        jobs: this.state.jobs.concat([job])
      })
      console.log(this.state.jobs);
    })
  }

  updateStatus(job) {
    if (job.completed) {
      goToSite(job.jobId);
    } else {
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
          this.setState({
            jobs: newState
          });
        }
      });
    }     
  }

  render() {
    return (
      <div>
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

        <JobTable jobs={this.state.jobs} updateStatus={this.updateStatus} />
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));

