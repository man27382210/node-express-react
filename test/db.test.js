/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import chai from 'chai';
import mongoose from 'mongoose';
import DB from '../db';
import { TestDBUri } from '../src/constants/uri';

const expect = chai.expect;

describe('mongodb', () => {
  before((done) => {
    mongoose.createConnection(TestDBUri, done);
    DB.IssueModel.remove({}, () => {});
  });
  it('can be saved and assign an unique seq', (done) => {
    const issue = new DB.IssueModel(
      {
        status: 'Open',
        category: 'cat1',
        title: 'title1',
        owner: 'Allen',
        priority: 'P1',
        isUpdate: false
      }
    );
    issue.save((err, doc) => {
      expect(err).to.be.null;
      expect(doc).to.eql(issue);
      expect(doc.seq).not.to.be.null;
      done();
    });
  });
  it('should have one document', () => {
    DB.IssueModel.find({}, (err, docs) => {
      expect(docs).to.have.length(1);
    });
  });
  after((done) => {
    DB.IssueModel.remove({}, () => {
      done();
    });
  });
});
