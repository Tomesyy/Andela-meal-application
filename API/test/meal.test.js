import chai from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import app from '../app.js';
import dummyData from '../utils/dummyData.js';

chai.use(chaiHttp);
const should = chai.should();
//TESTS

describe('Meals', () => {
    //test to get all meals 
    describe('Get /meals', () => {
        it('should get all Meals', (done) => {
            chai
            .request(app)
            .get('/api/v1/meals')
            .end((err, res) => {
                res.should.have.property('status', 200);
                res.should.be.json;
                res.body.data.should.be.a('array');
                done();
            });
        });
    });
    //test to post meals 
    describe('Post /meals', () => {
        it('should not post a meal without a name Field', (done) => {
            const meal = {
                id: 1,
                size: 'Large',
                price: '450'
            }
            chai
            .request(app)
            .post('/api/v1/meals')
            .send(meal)
            .end((err, res) => {
                res.should.have.property('status', 400);
                res.should.be.a('object');
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('data').eql('Input the Parameter Rightly');
            done();
            });

        });
        it('should Post a meal', (done) => {
            const meal = {
                id: 4,
                name: 'Garri',
                size: 'Large',
                price: '450'
            }
            chai
            .request(app)
            .post('/api/v1/meals')
            .send(meal)
            .end((err, res) => {
                res.should.have.property('status', 201);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('success');
                res.body.data.should.have.property('id');
                res.body.data.should.have.property('name');
                res.body.data.should.have.property('size');
                res.body.data.should.have.property('price');
            done();    
            });
        });
    });
    
    //test the Get /:id route

    describe('Get /meals/:id', () => {
        it('should get a single meal with the given id', (done) => {
            const mealId = Number(dummyData.meals[0].id);
            chai 
            .request(app)
            .get(`/api/v1/meals/${mealId}`)
            .end((err, res) => {
                res.should.have.property('status', 200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('success');
                res.body.data.should.have.property('id').eql(mealId);
                res.body.data.should.have.property('name');
                res.body.data.should.have.property('size');
                res.body.data.should.have.property('price');
            done(); 
            });
        });

        it('should throw an error when a number isnt passed', (done) => {
            const mealId = 'o';
            chai 
            .request(app)
            .get(`/api/v1/meals/${mealId}`)
            .end((err, res) => {
                res.should.have.property('status', 400);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('data').eql('Your id is not a number! it must be a number')
            done();
            });
        });
    });

    // test the Put Route

    describe('Put /meals/:id', () => {
        it('it should update a meal by given Id', (done) => {
            const mealId = Number(dummyData.meals[0].id);
            const updateMeal = {
                name: 'Bread and Beans',
                price: '900',
                size: 'Small'
            }
            chai
            .request(app)
            .put(`/api/v1/meals/${mealId}`)
            .send(updateMeal)
            .end((err, res) => {
                res.should.have.property('status', 201);
                res.should.be.a('object');
                res.body.should.have.property('status').eql('success');
                res.body.data.should.have.property('name').eql('Bread and Beans');
                res.body.data.should.have.property('price').eql('900');
                res.body.data.should.have.property('size').eql('Small');
            done();
            });
        });
        it('should return error for invalid Id', (done) => {
            const mealId = 'o';
            const updateMeal = {
                name: "Bread and Beans",
                price: '900',
                size: 'Small'
            }
            chai
            .request(app)
            .put(`/api/v1/meals/${mealId}`)
            .send(updateMeal)
            .end((err, res) => {
                res.should.have.property('status', 400);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Please make sure you input a Number');
            done();
            });

            //Test the delete Route

            describe('Delete /meals/:id', () => {
                it('should delete a meal with given Id', (done) => {
                    const mealId = Number(dummyData.meals[0].id);
                    chai
                    .request(app)
                    .delete(`/api/v1/meals/${mealId}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql('success');
                    done();
                    });
                });
                it('should not delete if Id id null', (done) => {
                    const mealId = 'o';
                    chai
                    .request(app)
                    .delete(`/api/v1/meals/${mealId}`)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql(`cannot delete meal with id ${mealId} now`);
                    done();
                    });
                });
            });

        });
    });
});