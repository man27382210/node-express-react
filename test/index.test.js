/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import DB from '../db';

const expect = chai.expect;

chai.use(chaiHttp);

describe('server', () => {
  beforeEach((done) => {
    DB.IssueModel.remove({}, () => {
      done();
    });
  });

  afterEach((done) => {
    DB.IssueModel.remove({}, () => {
      done();
    });
  });

  it('should return status 200 with no error', (done) => {
    chai.request(app)
      .get('/')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('#get, should get all issues', (done) => {
    chai.request(app)
      .get('/issues')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.instanceof(Array);
        expect(res.body).to.have.length(0);
        done();
      });
  });

  it('#post, should post an issue', (done) => {
    const issue = {
      status: 'Open',
      category: 'cat1',
      title: 'title1',
      owner: 'Allen',
      priority: 'P1',
      isUpdate: false
    };
    chai.request(app)
      .post('/issues')
      .send({ issue })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('seq');
        expect(res.body).to.have.property('status').eql(issue.status);
        expect(res.body).to.have.property('category').eql(issue.category);
        expect(res.body).to.have.property('title').eql(issue.title);
        expect(res.body).to.have.property('owner').eql(issue.owner);
        expect(res.body).to.have.property('priority').eql(issue.priority);
        expect(res.body).to.have.property('isUpdate').eql(issue.isUpdate);
        done();
      });
  });

  it('#put, should update issue with seq', (done) => {
    const issue = new DB.IssueModel({
      status: 'Open',
      category: 'cat1',
      title: 'title1',
      owner: 'Allen',
      priority: 'P1',
      isUpdate: false
    });
    const updateIssue = {
      seq: 1,
      status: 'Open',
      category: 'cat1',
      title: 'title33',
      owner: 'Allen',
      priority: 'P5',
      isUpdate: true
    };
    issue.save((error, doc) => {
      chai.request(app)
        .put('/issues/' + doc.seq)
        .send({ issue: updateIssue })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('seq');
          expect(res.body).to.have.property('status').eql(updateIssue.status);
          expect(res.body).to.have.property('category').eql(updateIssue.category);
          expect(res.body).to.have.property('title').eql(updateIssue.title);
          expect(res.body).to.have.property('owner').eql(updateIssue.owner);
          expect(res.body).to.have.property('priority').eql(updateIssue.priority);
          expect(res.body).to.have.property('isUpdate').eql(updateIssue.isUpdate);
          done();
        });
    });
  });

  it('#delete, should delete an issue', (done) => {
    const issue = new DB.IssueModel({
      status: 'Open',
      category: 'cat1',
      title: 'title1',
      owner: 'Allen',
      priority: 'P1',
      isUpdate: false
    });
    issue.save((error, doc) => {
      chai.request(app)
        .delete('/issues/' + doc.seq)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.eql(doc.seq);
          done();
        });
    });
  });

});
