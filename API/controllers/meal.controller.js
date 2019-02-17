import mealService from '../services/meal.service'



const mealController = {
    fetchAllMeals(req, res){
        const allMeals = mealService.fetchAllMeals();
        return res.json({
            status: 'success',
            data: allMeals
        }).status(200);
    },
    addMeal(req, res){
        /*
           Expect json of the format

           {
               name: 'food',
               size: 'Large',
               price: 900
           }
        */

        const newMeal = req.body;
        const createdMeal = mealService.addMeal(newMeal);
        return res.json({
            status: 'success',
            data: createdMeal
        }).status(201);
    },
    getSingleMeal(req, res){
        const id = req.params.id;
        const foundMeal = mealService.getMeal(id);
        return res.json({
            status: 'success',
            data: foundMeal
        }).status(200);

    },
    deleteSingleMeal(req, res){
        const id = req.params.id;
        const deleteMeal = mealService.deleteMeal(id);
        return res.json({
            status: 'success',
            data: deleteMeal
        }).status(200);

    },
    updateSingleMeal(req, res){
         const newUpdate = req.body;
         const id = req.params.id;
         const updateMeal = mealService.updateMeal(id, newUpdate);
         return res.json({
             status: 'success',
             data: updateMeal
         }).status(200);
    }

}

export default mealController;