/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import chai from 'chai';
import chaiHttp from 'chai-http';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../src/constants/ActionTypes';
import * as actions from '../src/actions';
import app from '../index';

const expect = chai.expect;
chai.use(chaiHttp);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  describe('sync action', () => {
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
    it('fetchDataSuccess should create FETCH_SUCCESS action', () => {
      const issues = { seq: 5, status: 'Processing', category: 'cat4', title: 'title5', owner: 'Allen', priority: 'P1', isUpdate: false };
      expect(actions.fetchDataSuccess(issues)).to.eql({ type: types.FetchSuccess, issues });
    });
  });
  describe('async actions', () => {
    it('fetchData should create fetchDataSuccess when fetching data has been done', () => {
      const expectedActions = [{ type: types.FetchSuccess, issues: [] }];
      const store = mockStore({ issues: [] });
      return store.dispatch(actions.fetchData())
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });
    it('addRow should create handleAddRow after insert data', () => {
      const issue = { status: 'Close', category: 'cat2', title: 'title3', owner: 'Allen', priority: 'P3', isUpdate: false };
      const expectedActions = [{ type: types.AddRow, issue }];
      const store = mockStore({ issues: [] });
      return store.dispatch(actions.addRow(issue))
        .then(() => {
          expect(store.getActions()[0].type).to.deep.equal(expectedActions[0].type);
          expect(store.getActions()[0].issue.status).to.deep.equal(expectedActions[0].issue.status);
          expect(store.getActions()[0].issue.category).to.deep.equal(expectedActions[0].issue.category);
          expect(store.getActions()[0].issue.title).to.deep.equal(expectedActions[0].issue.title);
          expect(store.getActions()[0].issue.owner).to.deep.equal(expectedActions[0].issue.owner);
          expect(store.getActions()[0].issue.priority).to.deep.equal(expectedActions[0].issue.priority);
          expect(store.getActions()[0].issue.isUpdate).to.deep.equal(expectedActions[0].issue.isUpdate);
        });
    });
    it('updateRow should create handleUpdateRow after update data', (done) => {
      const issue = { status: 'Close', category: 'cat2', title: 'title3', owner: 'Allen', priority: 'P3', isUpdate: true };
      chai.request(app)
        .post('/issues')
        .send({ issue })
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          const expectedActions = [{ type: types.UpdateRow, issue: res.body }];
          const store = mockStore({ issues: [] });
          return store.dispatch(actions.updateRow(res.body))
            .then(() => {
              expect(store.getActions()[0].type).to.deep.equal(expectedActions[0].type);
              expect(store.getActions()[0].seq).to.deep.equal(expectedActions[0].seq);
              expect(store.getActions()[0].category).to.deep.equal(expectedActions[0].category);
              expect(store.getActions()[0].title).to.deep.equal(expectedActions[0].title);
              expect(store.getActions()[0].owner).to.deep.equal(expectedActions[0].owner);
              expect(store.getActions()[0].priority).to.deep.equal(expectedActions[0].priority);
              expect(store.getActions()[0].isUpdate).to.deep.equal(expectedActions[0].isUpdate);
              done();
            });
        });
    });
    it('deleteRow should create handleDropRow after delete data', (done) => {
      const issue = { status: 'Close', category: 'cat2', title: 'title3', owner: 'Allen', priority: 'P3', isUpdate: true };
      chai.request(app)
        .post('/issues')
        .send({ issue })
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          const expectedActions = [{ type: types.DeleteRow, seq: res.body.seq }];
          const store = mockStore({ issues: [] });
          return store.dispatch(actions.dropRow(res.body.seq))
            .then(() => {
              expect(store.getActions()[0].type).to.deep.equal(expectedActions[0].type);
              expect(store.getActions()[0].seq).to.deep.equal(expectedActions[0].seq);
              done();
            });
        });
    });
  });
});
