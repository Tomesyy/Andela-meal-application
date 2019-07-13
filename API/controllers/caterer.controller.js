import Caterer from '../models/caterers.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config';

class CatererController {
    static async registerCaterer(req, res){
        try{
            const { firstname, lastname, email, catering_Company, password } = req.body;
            if(!firstname || !lastname || !email || !catering_Company || !password){
                throw new Error('Incorrect parameters');
            }
            const hashedPassword = await bcrypt.hashSync(password, 10);
            const emailIni = await Caterer.findOne({ where: { email: email }});
            if(emailIni){
                throw new Error('Caterer already exists');
            }
            const caterer = await Caterer.create({ firstname, lastname, email,  password: hashedPassword, catering_Company });
            const safeCaterer = {
                id: caterer.id,
                firstname: caterer.firstname,
                lastname: caterer.lastname,
                email: caterer.email,
                catering_Company: caterer.catering_Company
            };
            const jwtToken = jwt.sign({ caterer : safeCaterer, isCaterer: true }, config.secret, {
                expiresIn: 86400
            });
            return res.status(201).json({
                status: 'success',
                message: 'Caterer Registered',
                token: `Bearer ${jwtToken}`,
                caterer: safeCaterer
            });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }

    static async loginCaterer(req, res){
        try {
            const { email, password } = req.body;
            if(!email || !password){
                throw new Error('Incorrect parameters');
            }
            const caterer = await Caterer.findOne({ where: { email } });
            if (!caterer) {
                throw new Error(`Caterer does not exist`);
            };
            const result = await bcrypt.compare(password, caterer.password);
            if (!result) {
                throw new Error(`Password doesn't match our records`);
            };
            const safeCaterer = {
                id: caterer.id,
                firstname: caterer.firstname,
                lastname: caterer.lastname,
                email: caterer.email,
                catering_Company: caterer.catering_Company
            };
            const jwtToken = jwt.sign({ caterer: safeCaterer, isCaterer: true }, config.secret, {
               expiresIn: 86400
            });
            
            return res.status(200).json({
                    status: 'success',
                    message: 'Caterer Logged In',
                    token: `Bearer ${jwtToken}`,
                    caterer: safeCaterer
            });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }
}

export default CatererController;