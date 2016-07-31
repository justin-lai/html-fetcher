import React from 'react';
import {render} from 'react-dom';
import { getJob, postJob } from './api/helpers.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: ''
    };

    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUrlChange(e) {
    this.setState({ url: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    postJob({ url: this.state.url })
  }

  render() {
    return (
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
    )
  }
}

render(<App/>, document.getElementById('app'));

