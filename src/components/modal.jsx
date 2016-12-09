import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class ModalDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issue: this.props.issue
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddRow = this.handleAddRow.bind(this);
    this.handleUpdateRow = this.handleUpdateRow.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      issue: nextProps.issue
    });
  }
  handleChange(e) {
    const changeIssue = this.state.issue;
    changeIssue[e.target.name] = e.target.value;
    this.setState({ issue: changeIssue });
  }
  handleAddRow() {
    const issue = {
      status: this.statusInput.value,
      category: this.categoryInput.value,
      title: this.titleInput.value,
      owner: this.ownerInput.value,
      priority: this.priorityInput.value,
      isUpdate: false
    };
    this.props.onAddRow(issue);
  }
  handleUpdateRow() {
    const issue = {
      seq: this.state.issue.seq,
      status: this.statusInput.value,
      category: this.categoryInput.value,
      title: this.titleInput.value,
      owner: this.ownerInput.value,
      priority: this.priorityInput.value,
      isUpdate: true
    };
    this.props.onUpdateRow(issue);
  }
  render() {
    const seq = (this.props.title === 'New Issue') ? '' : 'seq: ' + this.props.issue.seq;
    const operation = (this.props.title === 'New Issue') ? this.handleAddRow : this.handleUpdateRow;
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} bsSize='large'>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body>
            {seq} <br /><br />
            Status: <input type='text' name='status' value={this.state.issue.status} ref={input => this.statusInput = input} onChange={this.handleChange} /><br /><br />
            Category: <input type='text' name='category' value={this.state.issue.category} ref={input => this.categoryInput = input} onChange={this.handleChange} /><br /><br />
            Title: <input type='text' name='title' value={this.state.issue.title} ref={input => this.titleInput = input} onChange={this.handleChange} /><br /><br />
            Owner: <input type='text' name='owner' value={this.state.issue.owner} ref={input => this.ownerInput = input} onChange={this.handleChange} /><br /><br />
            Priority: <input type='text' name='priority' value={this.state.issue.priority} ref={input => this.priorityInput = input} onChange={this.handleChange} /><br /><br />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={operation}>Save</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
ModalDialog.propTypes = {
  issue: React.PropTypes.shape({
    seq: React.PropTypes.number,
    status: React.PropTypes.string,
    category: React.PropTypes.string,
    title: React.PropTypes.string,
    owner: React.PropTypes.string,
    priority: React.PropTypes.string,
    onDropRow: React.PropTypes.func
  }),
  onAddRow: React.PropTypes.func,
  onHide: React.PropTypes.func,
  onUpdateRow: React.PropTypes.func,
  title: React.PropTypes.string,
  show: React.PropTypes.bool
};
