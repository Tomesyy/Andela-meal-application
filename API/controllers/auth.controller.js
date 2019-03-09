// import express from 'express';
// import { Router } from 'express';
// import bodyParser from 'body-parser';

// const router = Router();

// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());

import User from '../models/users.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config';

class UserController {
    static async registerUser(req, res){
        try{
            const { firstname, lastname, username, password, isAdmin } = req.body;
            const hashedPassword = await bcrypt.hashSync(password, 10);
            const user = await User.create({ firstname, lastname, username,  password: hashedPassword, isAdmin });
            const safeUser = {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            isAdmin: user.isAdmin
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
            const { username, password } = req.body;
            const user = await User.findOne({ where: { username } });
            if (!user) {
                throw new Error(`User with that username does not exist`);
            };
            const result = await bcrypt.compare(password, user.password);
            if (!result) {
                throw new Error(`Password doesn't match our records`);
            };
            const safeUser = {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            isAdmin: user.isAdmin
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
