import React from 'react';
import { Table, tbody } from 'react-bootstrap';
import IssueRow from './row';

export default class TrackingTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleDropRow = this.handleDropRow.bind(this);
    this.showModal = this.showModal.bind(this);
  }
  showModal(title, seq) {
    this.props.showModal(title, seq);
  }
  handleDropRow(seq) {
    this.props.onDropRow(seq);
  }
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
        showModal={this.showModal}
        onDropRow={this.handleDropRow}
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
              <th>Operation</th>
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
  issues: React.PropTypes.arrayOf(React.PropTypes.object),
  onDropRow: React.PropTypes.func
};
