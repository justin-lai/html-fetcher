import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div id="user-form">
        <label htmlFor="url">Enter a URL here:</label>
        <form method="POST">
          <input type="input" name="url"></input>
        </form>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));

