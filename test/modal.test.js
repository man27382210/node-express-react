/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint react/jsx-filename-extension:0, react/no-find-dom-node:0 */
import chai from 'chai';
import ReactTestUtils from 'react-addons-test-utils';
import React from 'react';
import sinon from 'sinon';
import ModalDialog from '../src/modal';

const expect = chai.expect;

describe('modal.jsx', () => {
  var onHideSpy = sinon.spy();
  var handleAddRowSpy = sinon.spy();
  var handleUpdateRowSpy = sinon.spy();

  describe('modal with insert new issue event', () => {
    var title = 'New Issue';
    var issue = {};

    beforeEach(() => {
      ReactTestUtils.renderIntoDocument(
        <ModalDialog
          show
          onHide={onHideSpy}
          title={title}
          issue={issue}
          onAddRow={handleAddRowSpy}
          onUpdateRow={handleUpdateRowSpy}
        />
      );
    });

    afterEach(() => {
      document.body.innerHTML = '';
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
      const inputList = [...modalBody[0].getElementsByTagName('input')];
      inputList.forEach((input) => {
        expect(input.value).to.be.equal('');
      });

      const modalFooter = document.getElementsByClassName('modal-footer');
      expect(modalFooter).to.have.length.of.at.least(1);
      expect(modalFooter[0].childNodes[0].tagName).to.be.equal('BUTTON');
      expect(modalFooter[0].childNodes[0].textContent).to.be.equal('Save');
    });

    it('should call onHide when click x', () => {
      const header = document.getElementsByClassName('modal-header');
      expect(header).to.have.length.of.at.least(1);
      const closeButton = header[0].childNodes[0];
      ReactTestUtils.Simulate.click(closeButton);
      expect(onHideSpy.calledOnce).to.be.true;
    });

    it('should call handleAddRow when click save', () => {
      const modalFooter = document.getElementsByClassName('modal-footer');
      expect(modalFooter).to.have.length.of.at.least(1);
      const saveButton = modalFooter[0].childNodes[0];
      ReactTestUtils.Simulate.click(saveButton);
      expect(handleAddRowSpy.calledOnce).to.be.true;
    });
  });

  describe('modal with update issue event', () => {
    var title = 'Update';
    var issue = { seq: 1, status: 'Open', category: 'cat1', title: 'title1', owner: 'Allen', priority: 'P1', isUpdate: false };

    beforeEach(() => {
      ReactTestUtils.renderIntoDocument(
        <ModalDialog
          show
          onHide={onHideSpy}
          title={title}
          issue={issue}
          onAddRow={handleAddRowSpy}
          onUpdateRow={handleUpdateRowSpy}
        />
      );
    });

    afterEach(() => {
      document.body.innerHTML = '';
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
      const inputList = [...modalBody[0].getElementsByTagName('input')];
      expect(inputList[0].value).to.be.equal(issue.status);
      expect(inputList[1].value).to.be.equal(issue.category);
      expect(inputList[2].value).to.be.equal(issue.title);
      expect(inputList[3].value).to.be.equal(issue.owner);
      expect(inputList[4].value).to.be.equal(issue.priority);

      const modalFooter = document.getElementsByClassName('modal-footer');
      expect(modalFooter).to.have.length.of.at.least(1);
      expect(modalFooter[0].childNodes[0].tagName).to.be.equal('BUTTON');
      expect(modalFooter[0].childNodes[0].textContent).to.be.equal('Save');
    });

    it('should call onHide when click x', () => {
      const header = document.getElementsByClassName('modal-header');
      expect(header).to.have.length.of.at.least(1);
      const closeButton = header[0].childNodes[0];
      ReactTestUtils.Simulate.click(closeButton);
      expect(onHideSpy.calledTwice).to.be.true;
    });

    it('should call handleUpdateRow when click save', () => {
      const modalFooter = document.getElementsByClassName('modal-footer');
      expect(modalFooter).to.have.length.of.at.least(1);
      const saveButton = modalFooter[0].childNodes[0];
      ReactTestUtils.Simulate.click(saveButton);
      expect(handleUpdateRowSpy.calledOnce).to.be.true;
    });
  });
});
