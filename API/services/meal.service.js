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
            return newMeal;
        });
        return validMeals;
    },
    addMeal(meal) {
        const mealLength = dummyData.meals.length;
        const lastId = dummyData.meals[mealLength - 1].id;
        const newId = lastId + 1;
        meal.id = newId;
        dummyData.meals.push(meal);
        return meal;
    },
    getMeal(id){
        const meal = dummyData.meals.find(meal => meal.id == id);
        return meal || {};
    }, 
    deleteMeal(id){
        const mealDelete = dummyData.meals.find(meal => meal.id == id);
        if(mealDelete){
            const index = dummyData.meals.indexOf(mealDelete);
            if(index > -1){
                dummyData.meals.splice(index, 1);
            }
        }
        return mealDelete;
    }, 
    updateMeal(id, meal){
        const mealUpdate = dummyData.meals.find(meal => meal.id == id);
        mealUpdate.name = meal.name;
        mealUpdate.size = meal.size;
        mealUpdate.price = meal.price;
        return mealUpdate || {};

    }
};


export default mealService;