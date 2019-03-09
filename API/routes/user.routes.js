import { Router } from 'express';

//controller 
import UserController from '../controllers/user.controller';

const router = Router();

router.post('/Register', UserController.registerUser);
router.post('/login', UserController.loginUser);


export default router;