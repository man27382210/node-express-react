import React from 'react';
import { tr, td, Button } from 'react-bootstrap';

export default class IssueRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleDropRow = this.handleDropRow.bind(this);
  }
  handleDropRow() {
    this.props.onDropRow(this.props.seq);
  }
  render() {
    return (
      <tr>
        <td>{this.props.seq}</td>
        <td>{this.props.status}</td>
        <td>{this.props.category}</td>
        <td>{this.props.title}</td>
        <td>{this.props.owner}</td>
        <td>{this.props.priority}</td>
        <td>
          <Button>Edit</Button>
          <Button onClick={this.handleDropRow}>Delete</Button>
        </td>
      </tr>
    );
  }
}

IssueRow.propTypes = {
  seq: React.PropTypes.number,
  status: React.PropTypes.string,
  category: React.PropTypes.string,
  title: React.PropTypes.string,
  owner: React.PropTypes.string,
  priority: React.PropTypes.string,
  onDropRow: React.PropTypes.func
};
