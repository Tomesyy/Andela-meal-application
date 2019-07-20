import { Router } from 'express';

//controller
import mealController from '../controllers/meal.controller';
//auth controllers
import AuthController from '../controllers/auth.controller';


const router = Router();

router.get('/', AuthController.verifyAdmin, mealController.fetchAllMeals);
router.post('/', AuthController.verifyAdmin, mealController.addMeal);
router.delete('/:id', AuthController.verifyAdmin, mealController.deleteSingleMeal);
router.put('/:id', AuthController.verifyAdmin, mealController.updateSingleMeal);



export default router;