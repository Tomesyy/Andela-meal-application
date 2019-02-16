import dummyData from '../utils/dummyData';
import Meal from '../models/meal.model';

const mealService = {
    fetchAllMeals(){
        const validMeals = dummyData.meals.map((meal) => {
            const newMeal = new Meal();
            newMeal.id = meal.id;
            newMeal.name = meal.name;
            newMeal.size = meal.size;
            newMeal.price = meal.price;
        });
        return validMeals;
    },
    addMeal(meal) {
        const mealLength = dummyData.meals.length;
        const lastId = dummyData.meals[mealLength - 1].id;
        const newId = lastId + 1;
        meal.id = newId;
        const newMeal = new Meal();
        dummyData.meals.push(meal);
        return meal;
    },
    getMeal(id){
        const meal = dummyData.meal.find(meal => meal.id = id);
        return meal || {};
    }
};


export default mealService;