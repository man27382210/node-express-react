var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index');
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

describe('server', () => {
  it('should return status 200 with no error', (done) => {
    chai.request(app)
      .get('/')
      .end(function(err, res){
        expect(err).to.be.null;
        res.should.have.status(200);
        done();
      })
  })
});
