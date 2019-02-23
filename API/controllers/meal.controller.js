import mealService from '../services/meal.service'



const mealController = {
    fetchAllMeals(req, res){
        const allMeals = mealService.fetchAllMeals();
        return res.status(200).json({
            status: 'success',
            data: allMeals
        });
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

        if(!newMeal.name || !newMeal.price || !newMeal.size) {
            return res.status(400).json({
                status: 'error',
                data: ('Input the Parameter Rightly')
            });
        }
        const createdMeal = mealService.addMeal(newMeal);
        return res.status(201).json({
            status: 'success',
            data: createdMeal
        });
    },
    getSingleMeal(req, res){
        const id = req.params.id;
        const foundMeal = mealService.getMeal(id);
        if(Number.isNaN(Number(id))) {
            return res.status(400).json({
                status: 'error',
                data: 'Your id is not a number! it must be a number'
            });
        } else {
            return res.status(200).json({
                status: 'success',
                data: foundMeal
            });
        }
        

    },
    deleteSingleMeal(req, res){
        const id = req.params.id;
        const deleteMeal = mealService.deleteMeal(id);

        if(deleteMeal == null) {
            return res.status(400).json({
                message: `cannot delete meal with id ${id} now`
            });
        }

        return res.status(200).json({
            status: 'success',
            data: deleteMeal
        });

    },
    updateSingleMeal(req, res){
         const newUpdate = req.body;
         const { id } = req.params;

         if(Number.isNaN(Number(id))) {
             return res.status(400).json({
                 message: 'Please make sure you input a Number'
             });
         }
         const updateMeal = mealService.updateMeal(id, newUpdate);
         return res.status(201).json({
             status: 'success',
             data: updateMeal
         });
    }

}

export default mealController;