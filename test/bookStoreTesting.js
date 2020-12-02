import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../app.js';
import fs from 'fs';

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe('BookStore API', () => {
  /**
   * @describe Testing LogIn POST request
   */
  // describe('POST /add-book', () => {
  //   it('It should add new book into the store', (done) => {
  //     let booksArray = JSON.parse(fs.readFileSync('./assets/book.json').toString());
  //     chai
  //       .request(server)
  //       .post('/add-book')
  //       .send(booksArray[0])
  //       .end((err, response) => {
  //         response.should.have.status(200);
  //         response.body.should.be.a('object');
  //         response.body.should.have.property('success').eq(true);
  //         response.body.should.have.property('message').eq('Successfully Added Book!');
  //         done();
  //       });
  //   });
  // });

  describe('POST /add-book', () => {
    it('It should fail if the same book is added into the store', (done) => {
      let booksArray = JSON.parse(fs.readFileSync('./assets/book.json').toString());
      chai
        .request(server)
        .post('/add-book')
        .send(booksArray[0])
        .end((err, response) => {
          response.should.have.status(409);
          response.body.should.be.a('object');
          response.body.should.have.property('success').eq(false);
          response.body.should.have.property('message').eq('Book already exists');
          done();
        });
    });
  });
});
