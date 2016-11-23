import React from 'react';
import { tr, td } from 'react-bootstrap';

export default class IssueRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.seq}</td>
        <td>{this.props.status}</td>
        <td>{this.props.category}</td>
        <td>{this.props.title}</td>
        <td>{this.props.owner}</td>
        <td>{this.props.priority}</td>
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
  priority: React.PropTypes.string
};
