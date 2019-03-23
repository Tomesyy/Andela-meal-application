import Caterer from '../models/caterers.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config';

class CatererController {
    static async registerCaterer(req, res){
        try{
            const { firstname, lastname, username, password, isAdmin } = req.body;
            const hashedPassword = await bcrypt.hashSync(password, 10);
            const usernameIni = await Caterer.findOne({ where: { username: username }});
            const caterer = await Caterer.create({ firstname, lastname, username,  password: hashedPassword, isAdmin });

            if(usernameIni){
                throw new Error('Caterer with username already exists');
            }
            const safeCaterer = {
                id: caterer.id,
                firstname: caterer.firstname,
                lastname: caterer.lastname,
                username: caterer.username,
                isAdmin: caterer.isAdmin
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
            const { username, password } = req.body;
            const caterer = await Caterer.findOne({ where: { username } });
            if (!caterer) {
                throw new Error(`Caterer with that username does not exist`);
            };
            const result = await bcrypt.compare(password, caterer.password);
            if (!result) {
                throw new Error(`Password doesn't match our records`);
            };
            const safeCaterer = {
                id: caterer.id,
                firstname: caterer.firstname,
                lastname: caterer.lastname,
                username: caterer.username,
                isAdmin: caterer.isAdmin
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