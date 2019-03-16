import chai from 'chai';
import 'chai/register-should';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

// Runs before each test
describe('User', () => {
    beforeEach((done) => {
        done();
    });

    // Test the post /auth/signup route
    
    describe('POST /auth/signup', () => {
        it('should not POST user without username field', (done) => {
            const newUser = {
                firstname: 'Charles',
                lastname: 'Donder',
                password: 'password',
                isAdmin: 'false'
              };
              chai
                .request(app)
                .post('/api/v1/auth/user/register')
                .send(newUser)
                .end((err, res) => {
                  res.should.have.status(500);
                  res.body.should.be.a('object');
                  res.body.should.have.property('status').eql('error');
                  res.body.should.have.property('message');
                  done();
                });
        });
        it('it should not POST a new user  without password field', (done) => {
            const newUser = {
                firstname: 'Charles',
                lastname: 'Donder',
                username: 'chally',
                isAdmin: 'false'
            };
            chai
              .request(app)
              .post('/api/v1/auth/user/register')
              .send(newUser)
              .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('message');
                done();
              });
        });
        // it('it should not POST a new user if the username already exist in the system', (done) => {
        //     const newUser = {
        //         firstname: 'Charles',
        //         lastname: 'Donder',
        //         username: 'chally',
        //         password: 'password',
        //         isAdmin: 'false'
        //     };
        //     chai
        //       .request(app)
        //       .post('/api/v1/auth/user/register')
        //       .send(newUser)
        //       .end((err, res) => {
        //         res.should.have.status(500);
        //         res.body.should.be.a('object');
        //         res.body.should.have.property('status').eql('error');
        //         res.body.should.have.property('message');
        //         done();
        //       });
        // });
        it('it should create a new user', (done) => {
            const newUser = {
              firstname: 'Adetomiwa',
              lastname: 'Adesanya',
              username: 'tomesyy',
              password: 'password',
              isAdmin: 'false'
            };
            chai
              .request(app)
              .post('/api/v1/auth/user/register')
              .send(newUser)
              .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('User Registered');
                res.body.should.have.property('status').eql('success');
                res.body.should.have.property('token');
                done();
              });
          });
    });

    // test the post /auth/login/ route
    describe('POST /auth/login', () => {
        it('it should throw an error if username is not provided', (done) => {
          const loginCredentials = {
            password: 'password',
          };
          chai
            .request(app)
            .post('/api/v1/auth/user/login')
            .send(loginCredentials)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('message');
              done();
            });
        });
    
        it('it should throw an error if password is not provided', (done) => {
          const loginCredentials = {
            username: 'chally',
          };
          chai
            .request(app)
            .post('/api/v1/auth/user/login')
            .send(loginCredentials)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('message');
              done();
            });
        });
    
        it('it should throw an error if user supply wrong username', (done) => {
          const loginCredentials = {
            username: 'Shallyyyy',
            password: 'password'
          };
          chai
            .request(app)
            .post('/api/v1/auth/user/login')
            .send(loginCredentials)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('message');
              done();
            });
        });
    
        it('it should throw an error if user supply a wrong username and password combination ', (done) => {
          const loginCredentials = {
            username: 'Shallyyyy',
            password: 'passwordyyy'
          };
          chai
            .request(app)
            .post('/api/v1/auth/user/login')
            .send(loginCredentials)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('message');
              done();
            });
        });
    
        it('it should login the user in', (done) => {
          const loginCredentials = {
            username: 'chally',
            password: 'password',
          };
          chai
            .request(app)
            .post('/api/v1/auth/user/login')
            .send(loginCredentials)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('success');
              res.body.should.have.property('message').eql('User Logged In');
              res.body.should.have.property('token');
              done();
            });
        });
      });
});






// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../app';
// import User from '../models/users.model';

// const { assert, expect, use } = chai;

// use(chaiHttp);

// const VERSION_API = '/api/v1';

// before(done => {
//     done();
// });

// describe('User Authentication Endpoints', () => {
//     context('Signup', () => {
//         it('POST /auth/signup - User SignUp (validation)', (done) => {
//             chai 
//               .request(app)
//               .post(`${VERSION_API}/auth/signup`)
//               .send({
//                   firstname: 'Rogger',
//                   lastname: 'Charles',
//                   username: 'Chally',
//                   isAdmin: 'false'
//               })
//               .then(res => {
//                   expect(res).to.have.status(400);
//                   assert.equal(res.body.status, 'error');
//                   assert.equal(res.body.type, 'validation');
//                   done();
//               })
//               .catch(err => console.log('POST /auth/signup', err.message));
//         });
//         it('POST /auth/signup - User Can Sign Up', done => {
//             chai
//               .request(app)
//               .post(`${VERSION_API}/auth/signup`)
//               .send({
//                 firstname: 'Rogger',
//                 lastname: 'Charles',
//                 username: 'Chally',
//                 isAdmin: 'false',
//                 password: 'password'
//               })
//               .then(res => {
//                 expect(res).to.have.status(201);
//                 assert.equal(res.body.status, 'success');
//                 done();
//               })
//               .catch(err => console.log('POST /auth/signup', err.message));
//         });
//         it("POST /auth/signup - User Can't signup again with the same username", done => {
//             chai
//               .request(app)
//               .post(`${VERSION_API}/auth/signup`)
//               .send({
//                 firstname: 'Rogger',
//                 lastname: 'Charles',
//                 username: 'Chally',
//                 isAdmin: 'false',
//                 password: 'password'
//               })
//               .then(res => {
//                 expect(res).to.have.status(500);
//                 assert.equal(res.body.status, 'error');
//                 done();
//               })
//               .catch(err => console.log('POST /auth/signup', err.message));
//         });
//     });

//     context('Login', () => {
//         it('POST /auth/login - User Login Validation(Required)', done => {
//           chai
//             .request(app)
//             .post(`${VERSION_API}/auth/login`)
//             .send({
//               username: 'Chally'
//             })
//             .then(res => {
//               expect(res).to.have.status(400);
//               assert.equal(res.body.status, 'error');
//               assert.equal(res.body.type, 'validation');
//               done();
//             })
//             .catch(err => console.log('POST /auth/login', err.message));
//         });
//         it('POST /auth/login - User Login Validation Test(Username)', done => {
//           chai
//             .request(app)
//             .post(`${VERSION_API}/auth/login`)
//             .send({
//               username: 'Chally',
//               password: 'password'
//             })
//             .then(res => {
//               expect(res).to.have.status(400);
//               assert.equal(res.body.status, 'error');
//               assert.equal(res.body.type, 'validation');
//               done();
//             })
//             .catch(err => console.log('POST /auth/login', err.message));
//         });
//         it('POST /auth/login - User Cannot Login without being registered', done => {
//           chai
//             .request(app)
//             .post(`${VERSION_API}/auth/login`)
//             .send({
//               username: 'Prosper',
//               password: 'password'
//             })
//             .then(res => {
//               expect(res).to.have.status(500);
//               assert.equal(res.body.status, 'error');
//               done();
//             })
//             .catch(err => console.log('POST /auth/login', err.message));
//         });
//         it('POST /auth/login - User Can Login', done => {
//           chai
//             .request(app)
//             .post(`${VERSION_API}/auth/login`)
//             .send({
//               username: 'Chally',
//               password: 'password'
//             })
//             .then(res => {
//               expect(res).to.have.status(200);
//               assert.equal(res.body.status, 'success');
//               done();
//             })
//             .catch(err => console.log('POST /auth/login', err.message));
//         });
//         it("POST /auth/login - User Can't login with incorrect password", done => {
//           chai
//             .request(app)
//             .post(`${VERSION_API}/auth/login`)
//             .send({
//               username: 'Chally',
//               password: 'password111'
//             })
//             .then(res => {
//               expect(res).to.have.status(500);
//               assert.equal(res.body.status, 'error');
//               done();
//             })
//             .catch(err => console.log('POST /auth/login', err.message));
//         });
//       });
// });

// after(done => {
//     User.destroy({ where: { username: 'Chally' } }).then(() => {
//       done();
//     });
// });