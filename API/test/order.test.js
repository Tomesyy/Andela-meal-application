import chai from 'chai';
import 'chai/register-should';
import chaiHTTP from 'chai-http';
import app from '../app';

chai.use(chaiHTTP);

// Run before each test
describe('Order', () => {
    let generatedToken = null;
    let catererToken = null;
    // Login user to generate userToken before test

    before('Login user to obtain auth token to be used in other operations', (done) => {
        const adminCredentials = {
            username: 'chally',
            password: 'password'
        };

        chai
          .request(app)
          .post('/api/v1/auth/user/login')
          .send(adminCredentials)
          .end((err, res) => {
              res.should.have.status(200);
              if(!err) {
                  generatedToken = res.body.token;
              }
              done();
          });
    });

    before('Login caterer to obtain auth token to be used in other operations', (done) => {
        const catererCredentials = {
            username: 'challyadmin',
            password: 'passwordadmin'
        };

        chai
          .request(app)
          .post('/api/v1/auth/caterer/login')
          .send(catererCredentials)
          .end((err, res) => {
              res.should.have.status(200);
              if(!err) {
                  catererToken = res.body.token;
              }
              done();
          });
    });

    // Test to get all orders
    describe('Get /orders', () => {
        it('should get all Orders', (done) => {
            chai
            .request(app)
            .get('/api/v1/orders')
            .set('authorization', catererToken)
            .end((err, res) => {
                res.should.have.property('status', 201);
                res.body.data.should.be.a('array');
            done();
            });
        });
    });

    // Test to post Order

    describe('Post /order', () => {
        it('should not post an order without address of Buyer', (done) => {
            const meal = {
                order: 'Amala',
                total: 456,
                delivery_status: 70,
                catererId: 12,
                userId: 23
            }
            chai
            .request(app)
            .post('/api/v1/orders')
            .send(meal)
            .set('authorization', generatedToken)
            .end((err, res) => {
                res.should.have.property('status', 400);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('data').eql('Input the Parameters Rightly');
            done();
            })
        })

        it('should Post an Order', (done) => {
            const meal = {
                order: 'Amala',
                total: 456,
                delivery_status: 70,
                billing_address: '23 Lagos street',
                catererId: 12,
                userId: 23
            }
            chai
            .request(app)
            .post('/api/v1/orders')
            .send(meal)
            .set('authorization', generatedToken)
            .end((err, res) => {
                res.should.have.property('status', 201);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('success');
                res.body.data.should.have.property('id')
                res.body.data.should.have.property('billing_address')
                res.body.data.should.have.property('total')
            done();    
            });
        });
    });

    // Test for update order

    describe('Put /orders/:id', () => {
        it('it should Update an order', (done) => {
            const orderId = 1
            const updateOrder = {
                order: 'Amala',
                total: 456,
                delivery_status: 70,
                billing_address: '23 Lagos street',
                catererId: 12,
                userId: 23
            };
            chai
            .request(app)
            .put(`/api/v1/orders/${orderId}`)
            .send(updateOrder)
            .set('authorization', generatedToken)
            .end((err, res) => {
                res.should.have.property('status', 200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('success');
            done()  
            });
        });

        it('it should return error for invalid Id', (done) => {
            const orderId = 'o';
            const updateOrder = {
                order: 'Amala',
                total: 456,
                delivery_status: 70,
                billing_address: '23 Lagos street',
                catererId: 12,
                userId: 23
                }
            chai
            .request(app)
            .put(`/api/v1/orders/${orderId}`)
            .send(updateOrder)
            .set('authorization', generatedToken)
            .end((err, res) => {
                res.should.have.property('status', 400);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Please make sure you input a Number');
            done();    
            });
        });
    });




});



// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import 'chai/register-should';
// import app from '../app.js';
// import dummyData from '../utils/dummyData.js';

// chai.use(chaiHttp);
// const should = chai.should();
// //TESTS

// describe('Orders', () => {
//     //test to get all meals 
//     describe('Get /orders', () => {
//         it('should get all Orders', (done) => {
//             chai
//             .request(app)
//             .get('/api/v1/orders')
//             .end((err, res) => {
//                 res.should.have.property('status', 200);
//                 res.should.be.json;
//                 res.body.data.should.be.a('array');
//             done();
//             });
//         });
//     });
//      //test to post order 
//      describe('Post /orders', () => {
//         it('should not post a order without a name Field', (done) => {
//             const order = {
//                 id: 1,
//                 quantity: '2',
//                 address: 'Unilag',
//                 price: '450'
//             }
//             chai
//             .request(app)
//             .post('/api/v1/orders')
//             .send(order)
//             .end((err, res) => {
//                 res.should.have.property('status', 400);
//                 res.should.be.a('object');
//                 res.body.should.have.property('status').eql('error');
//                 res.body.should.have.property('data').eql('Input the Parameters Rightly');
//             done();
//             });

//         });
//         it('should Post a order', (done) => {
//             const order = {
//                 id: 1,
//                 name: 'Bigman Suya',
//                 quantity: '2',
//                 address: 'Unilag',
//                 price: '450'
//             }
//             chai
//             .request(app)
//             .post('/api/v1/orders')
//             .send(order)
//             .end((err, res) => {
//                 res.should.have.property('status', 201);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('status').eql('success');
//                 res.body.data.should.have.property('id');
//                 res.body.data.should.have.property('name');
//                 res.body.data.should.have.property('quantity');
//                 res.body.data.should.have.property('address');
//                 res.body.data.should.have.property('price');
//             done();    
//             });
//         });
//     });
//     // test the Put Route

//     describe('Put /orders/:id', () => {
//         it('it should update a order by given Id', (done) => {
//             const orderId = Number(dummyData.orders[0].id);
//             const updateOrder = {
//                 name: 'Bread and Beans',
//                 quantity: '2',
//                 address: 'Unilag',
//                 price: '900'
//             }
//             chai
//             .request(app)
//             .put(`/api/v1/orders/${orderId}`)
//             .send(updateOrder)
//             .end((err, res) => {
//                 res.should.have.property('status', 201);
//                 res.should.be.a('object');
//                 res.body.should.have.property('status').eql('success');
//                 res.body.data.should.have.property('name').eql('Bread and Beans');
//                 res.body.data.should.have.property('quantity').eql('2');
//                 res.body.data.should.have.property('address').eql('Unilag');
//                 res.body.data.should.have.property('price').eql('900');
//             done();
//             });
//         });
//         it('should return error for invalid Id', (done) => {
//             const orderId = 'o';
//             const updateOrder = {
//                 name: 'Bread and Beans',
//                 quantity: '2',
//                 address: 'Unilag',
//                 price: '900'
//             }
//             chai
//             .request(app)
//             .put(`/api/v1/orders/${orderId}`)
//             .send(updateOrder)
//             .end((err, res) => {
//                 res.should.have.property('status', 400);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('message').eql('Please make sure you input a Number');
//             done();
//             });
//         }); 
//     });   
// });