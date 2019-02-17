import { Router } from 'express';


//controller
import mealController from '../controllers/meal.controller';



const router = Router();

router.get('/', mealController.fetchAllMeals);
router.post('/', mealController.addMeal);
router.get('/:id', mealController.getSingleMeal);
router.delete('/:id', mealController.deleteSingleMeal);
router.put('/:id', mealController.updateSingleMeal);



export default router;