import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../app.js';

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Registration API', () => {
  /**
   * @describe Testing LogIn POST request
   */
  // describe('POST /registration', () => {
  //   it('It should register user', (done) => {
  //     const userDataObject = {
  //       fullName: 'Edogawa Conan',
  //       emailId: 'edogawa.conan@gmail.com',
  //       password: '123456',
  //       mobileNumber: '9876543210',
  //     };
  //     chai
  //       .request(server)
  //       .post('/registration')
  //       .send(userDataObject)
  //       .end((err, response) => {
  //         response.should.have.status(200);
  //         response.body.should.be.a('object');
  //         response.body.should.have.property('success').eq(true);
  //         response.body.should.have
  //           .property('message')
  //           .eq('Successfully Registered User!');
  //         done();
  //       });
  //   });
  // });

  describe('POST /registration', () => {
    it('It should not register user if already registered', (done) => {
      const userDataObject = {
        fullName: 'Edogawa Conan',
        emailId: 'edogawa.conan@gmail.com',
        password: '123456',
        mobileNumber: '9876543210',
      };
      chai
        .request(server)
        .post('/registration')
        .send(userDataObject)
        .end((err, response) => {
          response.should.have.status(500);
          response.body.should.be.a('object');
          response.body.should.have.property('success').eq(false);
          response.body.should.have
            .property('message')
            .eq(
              'E11000 duplicate key error collection: book-store.users index: emailId_1 dup key: { emailId: "edogawa.conan@gmail.com" }'
            );
          done();
        });
    });
  });
});
