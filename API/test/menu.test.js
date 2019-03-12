// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import 'chai/register-should';
// import app from '../app.js';
// import dummyData from '../utils/dummyData.js';

// chai.use(chaiHttp);
// const should = chai.should();
// //TESTs for menu

// describe('Menus', () => {
//     describe('Get /Menu', () => {
//         it('should get the menus for the day', (done) => {
//             chai
//             .request(app)
//             .get('/api/v1/menus')
//             .end((err, res) => {
//                 res.should.have.property('status', 200);
//                 res.body.data.should.be.a('array');
//             done();
//             });
//         });
//     });
//     describe('Post /Menu', () => {
//         it('should not post a menu without a name field', (done) => {
//             const menu = {
//                 id: 1,
//                 details: 'roasted meat grilled with pepper',
//                 price: '400',
//                 delivery: 'FREE'
//             }
//             chai
//             .request(app)
//             .post('/api/v1/menus')
//             .send(menu)
//             .end((err, res) => {
//                 res.should.have.property('status', 400);
//                 res.should.be.a('object');
//                 res.body.should.have.property('status').eql('error');
//                 res.body.should.have.property('data').eql('Input the Parameters Rightly');
//             done();
//             });
//         });
//         it('should post a menu', (done) => {
//             const menu = {
//                 id: 1,
//                 name: 'Bigman Suya',
//                 details: 'roasted meat grilled with pepper',
//                 price: '400',
//                 delivery: 'FREE'
//             }
//             chai
//             .request(app)
//             .post('/api/v1/menus')
//             .send(menu)
//             .end((err, res) => {
//                 res.should.have.property('status', 201);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('status').eql('success');
//                 res.body.data.should.have.property('id');
//                 res.body.data.should.have.property('name');
//                 res.body.data.should.have.property('details');
//                 res.body.data.should.have.property('price');
//                 res.body.data.should.have.property('delivery');
//             done();
//             });
//         });
//     });
// });
