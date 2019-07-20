import User from '../models/users.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config';

class UserController {
    static async registerUser(req, res){
        try{
            const { firstname, lastname, email, password, phone } = req.body;
            if(!firstname || !lastname || !email || !password || !phone){
                throw new Error('Incorrect parameters');
            }
            const hashedPassword = await bcrypt.hashSync(password, 10);
            const emailIni = await User.findOne({ where: { email: email }});
            if(emailIni){
                throw new Error('User with that email already exist');
            }
            const user = await User.create({ firstname, lastname, email,  password: hashedPassword, phone });
            const safeUser = {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phone: user.phone
            };
            const jwtToken = jwt.sign({ user: safeUser }, config.secret, {
                expiresIn: 86400
            });
            return res.status(201).json({
                status: 'success',
                message: 'User Registered',
                token: `Bearer ${jwtToken}`,
                user: safeUser
            });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }
    static async loginUser(req, res){
        try {
            const { email, password } = req.body;
            if(!email || !password){
                throw new Error('Incorrect parameters');
            }
            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw new Error(`User does not exist`);
            };
            const result = await bcrypt.compare(password, user.password);
            if (!result) {
                throw new Error(`Password doesn't match our records`);
            };
            const safeUser = {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.username
            };
            const jwtToken = jwt.sign({ user: safeUser }, config.secret, {
               expiresIn: 86400
            });
            
            return res.status(200).json({
                    status: 'success',
                    message: 'User Logged In',
                    token: `Bearer ${jwtToken}`,
                    user: safeUser
                });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
    }
}

export default UserController;
