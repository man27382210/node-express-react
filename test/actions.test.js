/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import chai from 'chai';
import * as types from '../src/constants/ActionTypes';
import * as actions from '../src/actions';

const expect = chai.expect;

describe('actions', () => {
  it('handleDropRow should create DELETE_ROW action', () => {
    expect(actions.handleDropRow(1)).to.eql({ type: types.DeleteRow, seq: 1 });
  });
  it('handleAddRow should create ADD_ROW action', () => {
    const issue = { seq: 5, status: 'Processing', category: 'cat4', title: 'title5', owner: 'Allen', priority: 'P1', isUpdate: false };
    expect(actions.handleAddRow(issue)).to.eql({ type: types.AddRow, issue: issue });
  });
  it('handleUpdateRow should create UPDATE_ROW action', () => {
    const issue = { seq: 5, status: 'Processing', category: 'cat4', title: 'title5', owner: 'Allen', priority: 'P1', isUpdate: false };
    expect(actions.handleUpdateRow(issue)).to.eql({ type: types.UpdateRow, issue: issue });
  });
  it('handleShowModal should create SHOW_MODAL action', () => {
    const issue = { seq: 5, status: 'Processing', category: 'cat4', title: 'title5', owner: 'Allen', priority: 'P1', isUpdate: false };
    const title = 'Update';
    expect(actions.handleShowModal(title, issue)).to.eql({ type: types.ShowModal, title, issue });
  });
  it('handleCloseModal should create CLOSE_MODAL action', () => {
    expect(actions.handleCloseModal()).to.eql({ type: types.CloseModal });
  });
});
