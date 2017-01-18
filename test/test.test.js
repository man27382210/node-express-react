/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import chai from 'chai';
import chaiHttp from 'chai-http';
// import app from '../index';
import DB from '../db';
import sinon from 'sinon';
import 'sinon-mongoose';
import rewire from 'rewire';
var app = rewire('../index');


const expect = chai.expect;


chai.use(chaiHttp);

describe('test server', () => {
  
  it('test1', (done) => {
    var DBspy = sinon.spy(DB.IssueModel);
    var DBMock = sinon.mock(DB.IssueModel);
    DBMock
    .expects('find')
    .yields(null, []);

    chai.request(app)
      .get('/issues')
      .end((err, res) => {
        DBMock.verify();
        DBMock.restore();
        expect(DBspy).to.have.been.called;
        expect(res).to.have.status(200);
        expect(res.body).to.be.instanceof(Array);
        expect(res.body).to.have.length(0);
        done();
      });
  });

  it('test2', (done) => {
    const issue = {
      seq: "test1234",
      status: 'Open',
      category: 'cat1',
      title: 'title1',
      owner: 'Allen',
      priority: 'P1',
      isUpdate: false
    };
    app.__set__('DB', sinon.stub().returns(
      { 
        save: function(a, cb) {
          cb(null, issue)
        }
      }
    ));

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
});
