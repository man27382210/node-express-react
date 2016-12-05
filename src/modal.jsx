import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class ModalDialog extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} bsSize='large'>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <form>
            <Modal.Body>
              seq: {seq} <br /><br />
              Status: <input type='text' name='status' /><br /><br />
              Category: <input type='text' name='category' /><br /><br />
              Title: <input type='text' name='title' /><br /><br />
              Owner: <input type='text' name='owner' /><br /><br />
              Priority: <input type='text' name='priority' /><br /><br />
            </Modal.Body>
            <Modal.Footer>
              <Button>Save</Button>
            </Modal.Footer>
          </form>
        </Modal>
    );
  }
}
