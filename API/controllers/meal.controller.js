import mealService from '../services/meal.service'



const mealController = {
    fetchAllMeals(req, res){
        const allMeals = mealService.fetchAllMeals();
        return allMeals
            .then(meal => {
                res.status(200).json({
                status: 'success',
                data: meal
                })
            })
            .catch(err => console.log(err));
    },
    addMeal(req, res){
        /*
           Expect json of the forma
           {
               name: 'food',
               size: 'Large',
               price: 900
           }
        */
        const { name, quantity, imageUrl, details } = req.body;
        const newMeal = { name, quantity, imageUrl, details, catererId: req.caterer.id }

        if(!newMeal.name || !newMeal.quantity || !newMeal.imageUrl) {
            return res.status(400).json({
                status: 'error',
                data: ('Input the Parameter Rightly')
            });
        }
        const createdMeal = mealService.addMeal(newMeal);
        return createdMeal
            .then(meal => {
                res.status(201).json({
                status: 'success',
                data: meal
                })
            })
            .catch(err => console.log(err));
    },
    getSingleMeal(req, res) {
        const id = req.params.id;
        const foundMeal = mealService.getMeal(id);
        if(Number.isNaN(Number(id))) {
            return res.status(400).json({
                status: 'error',
                data: 'Your id is not a number! it must be a number'
            });
        } else {
            return foundMeal
                .then(meal => {
                    res.status(200).json({
                    status: 'success',
                    data: meal
                  })
                })
                .catch(err => console.log(err));
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
        return deleteMeal
            .then(meal => {
                res.status(200).json({
                    status: 'success',
                    data: meal
                });
            })
            .catch(err => console.log(err)); 

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
         return updateMeal
            .then(meal => {
                res.status(201).json({
                    status: 'success',
                    data: meal
                });
            })
            .catch(err => console.log(err));
    }

}

export default mealController;