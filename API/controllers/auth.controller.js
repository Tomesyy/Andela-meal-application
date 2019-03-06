import express from 'express';
import { Router } from 'express';
import bodyParser from 'body-parser';

const router = Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

import User from '../models/users.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config';

router.post('/register', (req, res) => {

    const { firstname, lastname, username, password, isAdmin } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = User.create({ firstname, lastname, username,  password: hashedPassword, isAdmin });
    const safeUser = {
      id: user.id,
      firstname: user.name,
      lastname: user.lastname,
      username: user.username,
      isAdmin: user.isAdmin
    };
    const jwtToken = jwt.sign({ user: safeUser }, config.secret, {
      expiresIn: 86400
    });
    if(jwtToken){
        return res.status(201).json({
            status: 'success',
            message: 'User Registered',
            token: `Bearer ${jwtToken}`,
            user: safeUser
        });
    } else {
        return res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
});
router.get('/me', (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      User.findByPk(decoded.id, { password: 0 }, (err, user) => {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        
        res.status(200).send(user);
      });
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = User.findOne({ where: { username } });
    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'User with that username does not exist'
        });
    };
    const result = bcrypt.compare(String(password), String(user.password), (res, err) => {
        if(err) {
            console.log(err);
        } else {
            console.log(res);
        }
    });
    if (!result) {
        return res.status(404).json({
            status: 'error',
            message: `Password doesn't match our records`
        });
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
    // User.findOne({ where: { username: req.body.username } }, (err, user) => {
    //     if (err) return res.status(500).send('Error on the server.');
    //     if (!user) return res.status(404).send('No user found.');
    //     const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    //     if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    //     const token = jwt.sign({ id: user.id }, config.secret, {
    //       expiresIn: 86400 // expires in 24 hours
    //     });
    //     return res.status(200).json({
    //          auth: true, 
    //          token: token,
    //          message: 'User logged In'
    //         });
    //   });
});

router.get('/logout', (req, res) => {
    res.status(200).send({ auth: false, token: null });
});


export default router;
