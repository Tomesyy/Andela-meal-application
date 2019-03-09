import { Router } from 'express';

//controller
import menuController from '../controllers/menu.controller';
//auth controllers
import AuthController from '../controllers/auth.controller';

const router = Router();

router.get('/', AuthController.verifyUser, menuController.fetchAllMenu);
router.post('/', AuthController.verifyAdmin, menuController.createMenu);


export default router;