import { Router } from 'express';

//controller
import mealController from '../controllers/menu.controller';

const router = Router();

router.get('/', mealController.fetchAllMenu);
router.post('/', mealController.createMeal);


export default router;