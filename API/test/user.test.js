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
              username: 'tomesyyy',
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