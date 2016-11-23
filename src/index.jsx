import React from 'react';
import ReactDOM from 'react-dom';
import TrackingTable from './table';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [{ seq: 1, status: 'Open', category: 'cat1', title: 'title1', owner: 'Allen', priority: 'P1' },
              { seq: 2, status: 'Open', category: 'cat1', title: 'title2', owner: 'Allen', priority: 'P2' },
              { seq: 3, status: 'Close', category: 'cat2', title: 'title3', owner: 'Allen', priority: 'P3' },
              { seq: 4, status: 'Pending', category: 'cat3', title: 'title4', owner: 'Allen', priority: 'P2' },
              { seq: 5, status: 'Processing', category: 'cat4', title: 'title5', owner: 'Allen', priority: 'P1' }]
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
