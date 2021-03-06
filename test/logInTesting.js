import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../app.js';

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Login API', () => {
  /**
   * @describe Testing LogIn POST request
   */
  describe('POST /login', () => {
    it('It should login user once email is verified', (done) => {
      const logInUserObject = {
        emailId: 'kakashi.hatake@gmail.com',
        password: '123456',
      };
      chai
        .request(server)
        .post('/login')
        .send(logInUserObject)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('success').eq(true);
          response.body.should.have.property('message').eq('Successfully Logged In!');
          done();
        });
    });
  });

  describe('POST /login', () => {
    it('It should fail login user with incorrect password', (done) => {
      const logInUserObject = {
        emailId: 'kakashi.hatake@gmail.com',
        password: '123452326',
      };
      chai
        .request(server)
        .post('/login')
        .send(logInUserObject)
        .end((err, response) => {
          response.should.have.status(500);
          response.body.should.be.a('object');
          response.body.should.have.property('success').eq(false);
          response.body.should.have.property('message').eq('Incorrect Password');
          done();
        });
    });
  });


  describe('POST /login', () => {
    it('It should fail login user with incorrect email', (done) => {
      const logInUserObject = {
        emailId: 'kakashi.hatakesae@gmail.com',
        password: '123452326',
      };
      chai
        .request(server)
        .post('/login')
        .send(logInUserObject)
        .end((err, response) => {
          response.should.have.status(500);
          response.body.should.be.a('object');
          response.body.should.have.property('success').eq(false);
          response.body.should.have.property('message').eq(`Invalid Email!`);
          done();
        });
    });
  });
});