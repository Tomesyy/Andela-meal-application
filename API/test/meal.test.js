import chai from 'chai';
import 'chai/register-should';
import chaiHTTP from 'chai-http';
import app from '../app';

chai.use(chaiHTTP);

// Run before each test
describe('Meal', () => {
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

    // Test the POST /meals/ route
    
    describe('POST /meals', () => {
        it('it should not post a meal without a name field', (done) => {
            const meal ={
                imageUrl: 'www.unsplash.com',
                quantity: '10',
                details: 'best meal',
                catererId: '12'
            };
            chai 
              .request(app)
              .post('/api/v1/meals')
              .send(meal)
              .set('authorization', catererToken)
              .end((err, res) => {
                  res.should.have.property('status', 400);
                  res.body.should.be.a('object');
                  res.body.should.have.property('status').eql('error');
                  res.body.should.have.property('data').eql('Input the Parameter Rightly');
               done();
              });
        });

        it('it should post a meal', (done) => {
            const meal = {
                name: 'Amala',
                imageUrl: 'www.unsplash.com',
                quantity: '10',
                details: 'best meal',
                catererId: '12'
            };
            chai
              .request(app)
              .post('/api/v1/meals')
              .send(meal)
              .set('authorization', catererToken)
              .end((err, res) => {
                  res.should.have.property('status', 201);
                  res.body.should.be.a('object');
                  res.body.should.have.property('status').eql('success');
                  res.body.data.should.have.property('id');
                  res.body.data.should.have.property('name');
                  res.body.data.should.have.property('details');
                  res.body.data.should.have.property('quantity');
                  res.body.data.should.have.property('catererId');
               done();
              });
        });
    });

    describe('GET /meals/:id', () => {
        it('should get a meal by the given id', (done) => {
            const mealId = 3;
            chai
              .request(app)
              .get(`/api/v1/meals/${mealId}`)
              .set('authorization', catererToken)
              .end((err, res) => {
                res.should.have.property('status', 200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('success');
                res.body.data.should.have.property('name');
                res.body.data.should.have.property('details');
                res.body.data.should.have.property('quantity');
                res.body.data.should.have.property('catererId');
              done();
            });
        });

        it('should throw an error when a number is not passed as id', (done) => {
            const mealId = 'o';
            chai
              .request(app)
              .get(`/api/v1/meals/${mealId}`)
              .set('authorization', catererToken)
              .end((err, res) => {
                res.should.have.property('status', 400);
                res.body.should.have.be.a('object');
                res.body.should.have.property('data').eql('Your id is not a number! it must be a number');
                done();
              });
        });
    });

    describe('PUT /meals/:id', () => {
        it('should update a meal given the id', (done) => {
            const mealId = 3;
            const updateMeal = {
                name: 'Amala',
                imageUrl: 'www.unsplash.com',
                quantity: '10',
                details: 'best meal',
                catererId: '12'
            };
            chai
              .request(app)
              .put(`/api/v1/meals/${mealId}`)
              .send(updateMeal)
              .set('authorization', catererToken)
              .end((err, res) => {
                res.should.have.property('status', 201);
                res.body.should.have.be.a('object');
                res.body.should.have.property('status').eql('success');
              done();
            });

        });
        it('should throw an error when a number is not passed as id', (done) => {
            const mealId = 'o';
            const updateMeal = {
                name: 'Amala',
                imageUrl: 'www.unsplash.com',
                quantity: '10',
                details: 'best meal',
                catererId: '12'
            };
            chai
              .request(app)
              .put(`/api/v1/meals/${mealId}`)
              .send(updateMeal)
              .set('authorization', catererToken)
              .end((err, res) => {
                res.should.have.property('status', 400);
                res.body.should.have.be.a('object');
                res.body.should.have.property('message').eql('Please make sure you input a Number');
              done();
            });

        });
    });

    describe('Delete /meals/:id', () => {
        it('should delete a meal with id', (done) => {
            const mealId = 1;
            chai
              .request(app)
              .delete(`/api/v1/meals/${mealId}`)
              .set('authorization', catererToken)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('status').eql('success');
               done();
              });
        });

        it('should not delete if Id is null', (done) => {
            const mealId = 'o';
            chai
            .request(app)
            .delete(`/api/v1/meals/${mealId}`)
            .set('authorization', catererToken)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
            done();
            });
        });
    });

});








// import fs from 'fs';
// import path from 'path';
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import 'chai/register-should';
// import jwt from 'jsonwebtoken';
// import app from '../app';
// import Meal from '../models/meal.model';
// import User from '../models/users.model';
// import Caterer from '../models/caterers.model';
// import config from '../config';

// const { assert, expect, use } = chai;

// use(chaiHttp);

// const VERSION_API = '/api/v1';

// const user = {
//     firstname: 'Collins',
//     lastname: 'Micheal',
//     username: 'Coll',
//     password: 'blubird',
//     isAdmin: 'False'
// };

// const caterer = {
//     firstname: 'Williams',
//     lastname: 'Oliver',
//     username: 'Wilo',
//     password: 'blucart',
//     isAdmin: 'True'
// };

// const caterer2 = {
//     firstname: 'Sandra',
//     lastname: 'Johnson',
//     username: 'Sandy',
//     password: 'blupary',
//     isAdmin: 'True'
// };

// const caterer3 = {
//     firstname: 'Prince',
//     lastname: 'Cole',
//     username: 'PC',
//     password: 'blucart',
//     isAdmin: 'True'
// };


// before(done => {
//     Caterer.create(caterer)
//       .then(() => {
//           return User.create(user);
//       })
//       .then(() => {
//           done();
//       });
// });


// describe('All Meals Endpoint', () => {
//     //test to get all meals
//     context('Get all Meals - Caterer', () => {
//         it('should Get All Meals (Unauthorized)', (done) => {
//             chai
//               .request(app)
//               .get(`${VERSION_API}/meals/`)
//               .then(res => {
//                   expect(res).to.have.status(401);
//                   assert.equal(res.body.status, 'error');
//                   done();
//               })
//               .catch(err => console.log('GET /meals', err.message));
//         });
//         it(`Get ${VERSION_API}/meals/ - Get All Meals (User unauthorized)`, (done) => {
//             User.findOne({ where: { username: user.username } })
//                 .then(user => {
//                    const { id, firstname, lastname, username, isAdmin } = user;
//                    const token = jwt.sign(
//                        {
//                            user: { id, firstname, lastname, username, isAdmin }
//                        }, 
//                        config.secret,
//                        {
//                            expiresIn: 86400
//                        }
//                    ); 
//                    chai
//                      .request(app)
//                      .get(`${VERSION_API}/meals/`)
//                      .set('Authorization', `Bearer ${token}`)
//                      .then(res => {
//                          expect(res).to.have.status(401);
//                          assert.equal(res.body.status, 'error');
//                          done();
//                      })
//                      .catch(err => console.log('GET /meals/', err.message));
//                })
//                .catch(err => console.log(err.message));
//         });
//         it(`GET ${VERSION_API}/meals/ - Get all meals (Caterer Authorized)`, (done) => {
//             Caterer.findOne({ where: { username: caterer.username } })
//             .then(caterer => {
//                 const { id, firstname, lastname, username, isAdmin } = caterer;
//                 const token = jwt.sign(
//                     {
//                         caterer: { id, firstname, lastname, username, isAdmin },
//                         isCaterer: true
//                     },
//                     config.secret,
//                     {
//                         expiresIn: 86400
//                     }
//                 );
//                 chai
//                   .request(app)
//                   .get(`${VERSION_API}/meals`)
//                   .set('Authorization', `Bearer ${token}`)
//                   .then(res => {
//                       expect(res).to.have.status(200);
//                       assert.equal(res.body.status, 'success');
//                       done();
//                   })
//                   .catch(err => console.log('GET /meals/', err.message));
//             })
//             .catch(err => console.log(err.message));
//         });
//     });

//     context('Add Meal (Caterer)', () => {
//         it(`POST ${VERSION_API}/meals/ - Add Meal (Unauthorized)`, (done) => {
//             chai
//               .request(app)
//               .post(`${VERSION_API}/meals/`)
//               .send({
//                   name: 'Test Meal',
//                   price: '500'
//               })
//               .then(res => {
//                   expect(res).to.have.status(401);
//                   assert.equal(res.body.status, 'error');
//                   done();
//               })
//               .catch(err => console.log('POST /meals/', err.message));
//         });
//         it(`POST ${VERSION_API}/meals/ - Add Meal (Validation)`, (done) => {
//             Caterer.findOne({ where: { username: caterer.username } })
//                 .then(caterer => {
//                     const token = jwt.sign(
//                         {
//                             caterer: {
//                                 id: caterer.id,
//                                 firstname: caterer.firstname,
//                                 lastname: caterer.lastname,
//                                 username: caterer.username,
//                                 isAdmin: caterer.isAdmin
//                             },
//                             isCaterer: true
//                         },
//                         config.secret,
//                         {
//                             expiresIn: 86400
//                         }
//                     );
//                     chai 
//                       .request(app)
//                       .post(`${VERSION_API}/meals/`)
//                       .set('Authorization', `Bearer ${token}`)
//                       .send({
//                           name: 'Test Meal',
//                           price: '500'
//                       })
//                       .then(res => {
//                           expect(res).to.have.status(400);
//                           assert.equal(res.body.status, 'error');
//                           done();
//                       })
//                       .catch(err => console.log('POST /meals/', err.message));
//                 })
//                 .catch(err => console.log(err.message));
//         });
//         it(`POST ${VERSION_API}/meals/ - Add Meal (Caterer Add Meal)`, (done) => {
//             Caterer.findOne({ where: { username: caterer.username } })
//                 .then(caterer => {
//                     const token = jwt.sign(
//                         {
//                             caterer: {
//                                 id: caterer.id,
//                                 firstname: caterer.firstname,
//                                 lastname: caterer.lastname,
//                                 username: caterer.username,
//                                 isAdmin: caterer.isAdmin
//                             },
//                             isCaterer: true
//                         },
//                         config.secret,
//                         {
//                             expiresIn: 86400
//                         }
//                     );
//                     chai 
//                       .request(app)
//                       .post(`${VERSION_API}/meals/`)
//                       .set('Authorization', `Bearer ${token}`)
//                       .field('name', 'Test Meal')
//                       .field('quantity', '30')
//                       .field('details', 'best meal')
//                       .field('imageUrl', 'www.unsplash.com')
//                       .then(res => {
//                           expect(res).to.have.status(201);
//                           assert.equal(res.body.status, 'success');
//                           done();
//                       })
//                       .catch(err => console.log('POST /meals/', err.message));
//                 })
//                 .catch(err => console.log(err.message));
//         });
//     });

//     context('Modify Meal Option (Caterer', () => {
//         Caterer.create(caterer2)
//            .then(caterer => {
//                return Meal.create({
//                    name: 'Fake Meal',
//                    quantity: '30',
//                    details: 'best Meal',
//                    imageUrl: 'www.unsplash.com',
//                    catererId: caterer.id
//                })
//                .then(meal => {
//                    it(`PUT ${VERSION_API}/meals/:mealId - Modify(Unauthorized)`, (done) => {
//                        chai
//                          .request(app)
//                          .put(`${VERSION_API}/meals/${meal.id}`)
//                          .send({
//                              name: 'Test Meal 2',
//                              price: 600
//                          })
//                          .then(res => {
//                              expect(res).to.have.status(401);
//                              assert.equal(res.body.status, 'error');
//                          })
//                          .catch(err => console.log('PUT /meals/:mealId', err.message));
//                    });
//                    it(`PUT ${VERSION_API}/meals/mealId - Modify (Validation)`, (done) => {
//                        Caterer.findOne({ where: { username: caterer2.username } })
//                        .then(caterer => {
//                            const token = jwt.sign(
//                                {
//                                    caterer: {
//                                        id: caterer.id,
//                                        firstname: caterer.firstname,
//                                        lastname: caterer.lastname,
//                                        username: caterer.username,
//                                        isAdmin: caterer.isAdmin
//                                    },
//                                    isCaterer: true
//                                },
//                                config.secret,
//                                {
//                                    expiresIn: 86400
//                                }
//                            );
//                            chai
//                              .request(app)
//                              .put(`${VERSION_API}/meals/${meal.id}`)
//                              .set('Authorization', `Bearer ${token}`)
//                              .send({
//                                  name: 300
//                              })
//                              .then(res => {
//                                  expect(res).to.have.status(400);
//                                  assert.equal(res.body.status, 'error');
//                                  done();
//                              })
//                              .catch(err => console.log('PUT /meals/', err.message));
//                        })
//                        .catch(err => console.log(err.message));
//                    });
//                    it(`PUT ${VERSION_API}/meals/mealId - Modify (Caterer Modify Meal)`, (done) => {
//                     Caterer.findOne({ where: { username: caterer2.username } })
//                     .then(caterer => {
//                         const token = jwt.sign(
//                             {
//                                 caterer: {
//                                     id: caterer.id,
//                                     firstname: caterer.firstname,
//                                     lastname: caterer.lastname,
//                                     username: caterer.username,
//                                     isAdmin: caterer.isAdmin
//                                 },
//                                 isCaterer: true
//                             },
//                             config.secret,
//                             {
//                                 expiresIn: 86400
//                             }
//                         );
//                         chai
//                           .request(app)
//                           .put(`${VERSION_API}/meals/${meal.id}`)
//                           .set('Authorization', `Bearer ${token}`)
//                           .field('name', 'Test Meal 2')
//                           .field('quantity', '30')
//                           .field('details', 'best meal')
//                           .field('imageUrl', 'www.unsplash.com')
//                           .then(res => {
//                               expect(res).to.have.status(200);
//                               assert.equal(res.body.status, 'success');
//                               Meal.destroy({ where: { id: meal.id }}).then(() => {
//                                   done();
//                               })
//                           })
//                           .catch(err => console.log('PUT /meals/', err.message));
//                     })
//                     .catch(err => console.log(err.message));
//                 });
//                });
//            })
//            .catch(err => err.message);
//     });
//     context('Delete Meal (Caterer)', () => {
//         Caterer.create(caterer3)
//         .then(caterer => {
//             return Meal.create({
//                 name: 'Fake Meal',
//                 quantity: '30',
//                 details: 'best Meal',
//                 imageUrl: 'www.unsplash.com',
//                 catererId: caterer.id
//             });
//         })
//         .then(meal => {
//             it(`DELETE ${VERSION_API}/meals/:mealId - Delete Meal (Unauthorized)`, (done) => {
//                 chai
//                   .request(app)
//                   .delete(`${VERSION_API}/meals/${meal.id}`)
//                   .then(res => {
//                       expect(res).to.have.status(401);
//                       assert.equal(res.body.status, 'error');
//                       done();
//                   })
//                   .catch(err => console.log('DELETE /meals/:mealId', err.message));
//             });
//             it(`DELETE ${VERSION_API}/meals/:mealId - Delete Meal (Caterer Authorized - Meal does not exist)`, (done) => {
//                 Caterer.findOne({ where: { username: caterer3.username }})
//                    .then(caterer => {
//                        const { id, firstname, lastname, username, isAdmin } = caterer;
//                        const token = jwt.sign(
//                            {
//                                caterer: { id, firstname, lastname, username, isAdmin },
//                                isCaterer: true
//                            },
//                            config.secret,
//                            {
//                                expiresIn: 86400
//                            }
//                        );
//                        chai
//                          .request(app)
//                          .delete(`${VERSION_API}/meals/${40000}`)
//                          .set('Authorization', `Bearer ${token}`)
//                          .then(res => {
//                              expect(res).to.have.status(500);
//                              assert.equal(res.body.status, 'error');
//                              done();
//                          })
//                          .catch(err => console.log('DElETE /meals/:mealId', err.message));
//                    })
//                    .catch(err => console.log(err.message));
//             });
//             it(`DELETE ${VERSION_API}/meals/:mealId - Delete Meal (Unauthorized)`, (done) => {
//                 chai
//                   .request(app)
//                   .delete(`${VERSION_API}/meals/${meal.id}`)
//                   .then(res => {
//                       expect(res).to.have.status(401);
//                       assert.equal(res.body.status, 'error');
//                       done();
//                   })
//                   .catch(err => console.log('DELETE /meals/:mealId', err.message));
//             });
//             it(`DELETE ${VERSION_API}/meals/:mealId - Delete Meal (Caterer Authorized - Meal does not exist)`, (done) => {
//                 Caterer.findOne({ where: { username: caterer3.username }})
//                    .then(caterer => {
//                        const { id, firstname, lastname, username, isAdmin } = caterer;
//                        const token = jwt.sign(
//                            {
//                                caterer: { id, firstname, lastname, username, isAdmin },
//                                isCaterer: true
//                            },
//                            config.secret,
//                            {
//                                expiresIn: 86400
//                            }
//                        );
//                        chai
//                          .request(app)
//                          .delete(`${VERSION_API}/meals/${meal.id}`)
//                          .set('Authorization', `Bearer ${token}`)
//                          .then(res => {
//                              expect(res).to.have.status(200);
//                              assert.equal(res.body.status, 'success');
//                              done();
//                          })
//                          .catch(err => console.log('DElETE /meals/:mealId', err.message));
//                    })
//                    .catch(err => console.log(err.message));
//             });
//         })
//     });

// })




// after(done => {
//     Caterer.destroy({ where: { username: caterer.username }})
//       .then(async () => {
//           await Caterer.destroy({ where: { username: caterer2.username }});
//           await Caterer.destroy({ where: { username: caterer3.username }});
//           return User.destroy({ where: { username: user.username} });
//           done();
//       })
// });













// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import 'chai/register-should';
// import app from '../app.js';
// import dummyData from '../utils/dummyData.js';

// chai.use(chaiHttp);
// const should = chai.should();
// //TESTS

// describe('Meals', () => {
//     //test to get all meals 
//     describe('Get /meals', () => {
//         it('should get all Meals', (done) => {
//             chai
//             .request(app)
//             .get('/api/v1/meals')
//             .end((err, res) => {
//                 res.should.have.property('status', 200);
//                 res.should.be.json;
//                 res.body.data.should.be.a('array');
//             done();
//             });
//         });
//     });
//     //test to post meals 
//     describe('Post /meals', () => {
//         it('should not post a meal without a name Field', (done) => {
//             const meal = {
//                 id: 1,
//                 size: 'Large',
//                 price: '450'
//             }
//             chai
//             .request(app)
//             .post('/api/v1/meals')
//             .send(meal)
//             .end((err, res) => {
//                 res.should.have.property('status', 400);
//                 res.should.be.a('object');
//                 res.body.should.have.property('status').eql('error');
//                 res.body.should.have.property('data').eql('Input the Parameter Rightly');
//             done();
//             });

//         });
//         it('should Post a meal', (done) => {
//             const meal = {
//                 id: 1,
//                 name: 'Garri',
//                 size: 'Large',
//                 price: '450'
//             }
//             chai
//             .request(app)
//             .post('/api/v1/meals')
//             .send(meal)
//             .end((err, res) => {
//                 res.should.have.property('status', 201);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('status').eql('success');
//                 res.body.data.should.have.property('id');
//                 res.body.data.should.have.property('name');
//                 res.body.data.should.have.property('size');
//                 res.body.data.should.have.property('price');
//             done();    
//             });
//         });
//     });
    
//     //test the Get /:id route

//     describe('Get /meals/:id', () => {
//         it('should get a single meal with the given id', (done) => {
//             const mealId = Number(dummyData.meals[0].id);
//             chai 
//             .request(app)
//             .get(`/api/v1/meals/${mealId}`)
//             .end((err, res) => {
//                 res.should.have.property('status', 200);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('status').eql('success');
//                 res.body.data.should.have.property('id').eql(mealId);
//                 res.body.data.should.have.property('name');
//                 res.body.data.should.have.property('size');
//                 res.body.data.should.have.property('price');
//             done(); 
//             });
//         });

//         it('should throw an error when a number isnt passed', (done) => {
//             const mealId = 'o';
//             chai 
//             .request(app)
//             .get(`/api/v1/meals/${mealId}`)
//             .end((err, res) => {
//                 res.should.have.property('status', 400);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('status').eql('error');
//                 res.body.should.have.property('data').eql('Your id is not a number! it must be a number')
//             done();
//             });
//         });
//     });

//     // test the Put Route

//     describe('Put /meals/:id', () => {
//         it('it should update a meal by given Id', (done) => {
//             const mealId = Number(dummyData.meals[0].id);
//             const updateMeal = {
//                 name: 'Bread and Beans',
//                 price: '900',
//                 size: 'Small'
//             }
//             chai
//             .request(app)
//             .put(`/api/v1/meals/${mealId}`)
//             .send(updateMeal)
//             .end((err, res) => {
//                 res.should.have.property('status', 201);
//                 res.should.be.a('object');
//                 res.body.should.have.property('status').eql('success');
//                 res.body.data.should.have.property('name').eql('Bread and Beans');
//                 res.body.data.should.have.property('price').eql('900');
//                 res.body.data.should.have.property('size').eql('Small');
//             done();
//             });
//         });
//         it('should return error for invalid Id', (done) => {
//             const mealId = 'o';
//             const updateMeal = {
//                 name: "Bread and Beans",
//                 price: '900',
//                 size: 'Small'
//             }
//             chai
//             .request(app)
//             .put(`/api/v1/meals/${mealId}`)
//             .send(updateMeal)
//             .end((err, res) => {
//                 res.should.have.property('status', 400);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('message').eql('Please make sure you input a Number');
//             done();
//             });
//         }); 
//     });   
//             //Test the delete Route

//     describe('Delete /meals/:id', () => {
//         it('should delete a meal with given Id', (done) => {
//             const mealId = Number(dummyData.meals[0].id);
//             chai
//             .request(app)
//             .delete(`/api/v1/meals/${mealId}`)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('status').eql('success');
//             done();
//             });
//         });
//         it('should not delete if Id id null', (done) => {
//             const mealId = 'o';
//             chai
//             .request(app)
//             .delete(`/api/v1/meals/${mealId}`)
//             .end((err, res) => {
//                 res.should.have.status(400);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('message').eql(`cannot delete meal with id ${mealId} now`);
//             done();
//             });
//         });
//     });
// });