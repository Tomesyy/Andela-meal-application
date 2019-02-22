import chai from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import app from '../app.js';

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
        it('should add a single meal to data', (done) => {
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
                res.should.be.json;
                res.should.be.a('object');
                done();
            });

        });
    });
});