import jwt from 'jsonwebtoken';
import config from '../config';

class AuthController {
    static async decodeToken(req) {
        try {
            const token = req.headers.authorization;
            if(!token) {
                throw new Error('Token not provided');
            }
            const jwtToken = token.split(' ')[1];
            const decoded = await jwt.verify(jwtToken, config.secret);
            return decoded;
        } catch (err) {
            console.log(err);
            throw new Error('Invalid Auth Token');
        }
    }

    static async verifyUser(req, res, next) {
        try {
            const decoded = await AuthController.decodeToken(req);
            req.user = decoded.user;
            next();
            return true;
        } catch (err) {
            return res.status(401).json({
                status: 'error',
                message: err.message
            });
        }
    }

    static async verifyAdmin(req, res, next) {
        try {
            const decoded = await AuthController.decodeToken(req);
            if(!decoded.isCaterer) {
                throw new Error('Unauthorized');
            }
            req.caterer = decoded.caterer;
            next();
            return true;
        } catch (err) {
            return res.status(401).json({
                status: 'error',
                message: err.message
            });
        }
    }
}

export default AuthController;