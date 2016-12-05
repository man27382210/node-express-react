import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import TrackingTable from './table';
import issues from './constant';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: issues
    };
    this.handleDropRow = this.handleDropRow.bind(this);
  }
  handleDropRow(seq) {
    const issues = this.state.issues.filter(issue => issue.seq !== seq);
    this.setState({ issues });
  }
  render() {
    return (
      <div>
        <Button>New</Button>
        <TrackingTable issues={this.state.issues} onDropRow={this.handleDropRow} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
