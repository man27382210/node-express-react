import React from 'react';
import { Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TrackingTable from './table';
import issueList from './constant';
import ModalDialog from './modal';
import * as actions from './actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: issueList,
      showModal: false,
      title: 'New Issue',
      issue: {}
    };
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  handleShowModal(title, issue) {
    this.setState({ showModal: true, title, issue });
  }
  handleCloseModal() {
    this.setState({ showModal: false });
  }
  render() {
    return (
      <div>
        <Button onClick={() => this.handleShowModal('New Issue', {})}>New</Button>
        <TrackingTable issues={this.props.issues} showModal={this.handleShowModal} onDropRow={this.props.actions.handleDropRow} />
        <ModalDialog
          show={this.state.showModal}
          onHide={this.handleCloseModal}
          title={this.state.title}
          issue={this.state.issue}
          onAddRow={this.props.actions.handleAddRow}
          onUpdateRow={this.props.actions.handleUpdateRow}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  issues: state.issues
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  issues: React.PropTypes.arrayOf(React.PropTypes.object),
  actions: React.PropTypes.shape({
    handleDropRow: React.PropTypes.func,
    handleAddRow: React.PropTypes.func,
    handleUpdateRow: React.PropTypes.func
  })
};
