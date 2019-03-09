import { Router } from 'express';

//controller
import menuController from '../controllers/menu.controller';

const router = Router();

router.get('/', menuController.fetchAllMenu);
router.post('/', menuController.createMeal);


export default router;