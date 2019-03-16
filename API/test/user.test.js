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