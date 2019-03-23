import chai from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import app from '../app';

chai.use(chaiHttp);
const should = chai.should();

// Run before each test
describe('Menu', () => {
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
    // Test get all menus

    describe('Get /menus', () => {
        it('should fetch all Menus', (done) => {
            chai
            .request(app)
            .get('/api/v1/menus')
            .set('authorization', generatedToken)
            .end((err, res) => {
                res.should.have.property('status', 200);
                res.body.should.be.a('object');
            done();    
            });
        });
    });

    describe('Post /menus', () => {
        it('should not post a menu without meals of Menu', (done) => {
            const menu = {
                catererId: '12'
            }
            chai
            .request(app)
            .post('/api/v1/menus')
            .send(menu)
            .set('authorization', catererToken)
            .end((err, res) => {
                res.should.have.property('status', 400);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('data').eql('Input the Parameters Rightly');
            done();
            })
        })

        it('should Post a meal', (done) => {
            const menu = {
                meals: {
                    name: 'Amala',
                    imageUrl: 'www.unsplash.com',
                    quantity: '10',
                    details: 'best meal',
                    catererId: '12'
                },
                catererId: '12'
            }
            chai
            .request(app)
            .post('/api/v1/menus')
            .send(menu)
            .set('authorization', catererToken)
            .end((err, res) => {
                res.should.have.property('status', 201);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('success');
                res.body.data.should.have.property('id')
                res.body.data.should.have.property('meals')
            done();    
            });
        });
    });

});