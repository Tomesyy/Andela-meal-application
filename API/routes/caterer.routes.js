import { Router } from 'express';

//controller 
import CatererController from '../controllers/caterer.controller';

const router = Router();

router.post('/Register', CatererController.registerCaterer);
router.post('/login', CatererController.loginCaterer);


export default router;