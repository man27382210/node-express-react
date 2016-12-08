/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint react/jsx-filename-extension:0, react/no-find-dom-node:0 */
import chai from 'chai';
import ReactTestUtils from 'react-addons-test-utils';
import React from 'react';
import sinon from 'sinon';
import ModalDialog from '../src/modal';

const expect = chai.expect;

describe('modal.jsx', () => {
  var title = 'New Issue';
  var issue = { seq: 1, status: 'Open', category: 'cat1', title: 'title1', owner: 'Allen', priority: 'P1', isUpdate: false };
  var spy = sinon.spy();

  beforeEach(() => {
    ReactTestUtils.renderIntoDocument(
      <ModalDialog
        show
        onHide={spy}
        title={title}
        issue={issue}
      />
    );
  });

  it('should render when props show is true', () => {
    const modal = document.getElementsByClassName('modal-dialog');
    expect(modal).to.have.length.of.at.least(1);

    const header = document.getElementsByClassName('modal-header');
    expect(header).to.have.length.of.at.least(1);
    expect(header[0].childNodes[0].tagName).to.be.equal('BUTTON');

    const modalTitle = document.getElementsByClassName('modal-title');
    expect(modalTitle).to.have.length.of.at.least(1);
    expect(modalTitle[0].textContent).to.be.equal(title);

    const modalBody = document.getElementsByClassName('modal-body');
    expect(modalBody).to.have.length.of.at.least(1);
    expect(modalBody[0].getElementsByTagName('input')).to.have.length.of.at.least(Object.keys(issue).length - 2);

    const modalFooter = document.getElementsByClassName('modal-footer');
    expect(modalFooter).to.have.length.of.at.least(1);
    expect(modalFooter[0].childNodes[0].tagName).to.be.equal('BUTTON');
    expect(modalFooter[0].childNodes[0].textContent).to.be.equal('Save');
  });

  it('call onHide when click x', () => {
    const header = document.getElementsByClassName('modal-header');
    expect(header).to.have.length.of.at.least(1);
    const closeButton = header[0].childNodes[0];
    ReactTestUtils.Simulate.click(closeButton);
    expect(spy.calledOnce).to.be.true;
  });
});
