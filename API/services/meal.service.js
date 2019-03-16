import dummyData from '../utils/dummyData';
import Meal from '../models/meal.model';

const mealService = {
    fetchAllMeals(){
        return Meal.findAll()
    },
    addMeal(meal) {
        return Meal.create(meal);
    },
    getMeal(id){
        return Meal.findOne({
            where: {
                id: id
            }
        });
    }, 
    deleteMeal(id){
        return Meal.destroy({
            where: {
                id: id
            }
        });
    }, 
    updateMeal(id, meal){
        // const mealUpdate = dummyData.meals.find(meal => meal.id == id);
        // mealUpdate.name = meal.name;
        // mealUpdate.size = meal.size;
        // mealUpdate.price = meal.price;
        // return mealUpdate || {};
        return Meal.update(
            {
                name: meal.name,
                imageUrl: meal.imageUrl,
                details: meal.details,
                quantity: meal.quantity,
                catererId: meal.catererId
            },
            {
                where: {
                    id: id
                }
            }
        );

    }
};


export default mealService;