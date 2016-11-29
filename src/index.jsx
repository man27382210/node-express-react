import React from 'react';
import ReactDOM from 'react-dom';
import TrackingTable from './table';
import issues from './constant';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: issues
    };
  }
  render() {
    return (
      <div>
        <TrackingTable issues={this.state.issues} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
