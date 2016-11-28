import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('server', () => {
  it('should return status 200 with no error', (done) => {
    chai.request(app)
      .get('/')
      .end(function(err, res) {
        expect(err).to.be.null;
        res.should.have.status(200);
        done();
      });
  });
});
