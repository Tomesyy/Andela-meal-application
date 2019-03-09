import { Router } from 'express';

//controller 
import AuthController from '../controllers/auth.controller';

const router = Router();

router.post('/Register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);


export default router;