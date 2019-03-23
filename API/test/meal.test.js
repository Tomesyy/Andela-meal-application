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