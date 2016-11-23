import React from 'react';
import { Table, tbody } from 'react-bootstrap';
import IssueRow from './row';

export default class TrackingTable extends React.Component {
  render() {
    var issues = this.props.issues.map(issue => (
      <IssueRow
        key={issue.seq}
        seq={issue.seq}
        status={issue.status}
        category={issue.category}
        title={issue.title}
        owner={issue.owner}
        priority={issue.priority}
      />
  ));
    return (
      <div>
        <Table responsive striped bordered condensed hover>
          <thead>
            <tr>
              <th>seq</th>
              <th>Status</th>
              <th>Category</th>
              <th>Title</th>
              <th>Owner</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {issues}
          </tbody>
        </Table>
      </div>
    );
  }
}

TrackingTable.propTypes = {
  issues: React.PropTypes.arrayOf(React.PropTypes.object)
};
