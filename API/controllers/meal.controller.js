import Meal from '../models/meal.model';



class mealController  {
    static async fetchAllMeals(req, res){
        try {
            const meals = await Meal.findAll({ where: { catererId: req.caterer.id }});
            return res.status(200).json({
                status: 'sucsess',
                message: 'successfully fetched meals',
                data: meals
            });
        } catch(err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
        
    };
    static async addMeal(req, res){
        try {
            const { name, price, imageUrl, quantity } = req.body;
            const catererId = req.caterer.id;
            if(!name || !imageUrl || !price || !catererId || !quantity) {
                return res.status(400).json({
                    status: 'error',
                    data: 'Input the Parameter Rightly'
                });
            }
            const newMeal = await Meal.create({
                name,
                price,
                imageUrl,
                quantity,
                catererId 
            });
            return res.status(200).json({
                status: 'success',
                message: 'Sucessfully added meal',
                data: { newMeal }
            });
        } catch(err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
        
    };
    
    static async updateSingleMeal(req, res){
        try {
            const { id } = req.params;
            const meal = await Meal.findOne({ where: { id }});
            if(!meal){
                throw new Error(`Meal with ${id} does not exist`);
            }
            if(meal.catererId !== req.caterer.id){
                throw new Error('You are not allowed to do that');
            }
            const mealUpdate = {
                name: req.body.name,  
                imageUrl: req.body.imageUrl,
                price: req.body.price,
                quantity: req.body.quantity
            };
            const { name, imageUrl, price, quantity } = mealUpdate;
            await Meal.update({ name, price, imageUrl, quantity }, { where: { id } });
            res.status(200).json({
                status: 'success',
                message: 'successfuly updated meal',
                data: mealUpdate
            });
        } catch(err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
        
    };

    static async deleteSingleMeal(req, res){
        try {
            const { id } = req.params;
            const meal = await Meal.findOne({ where: { id }});
            if(!meal){
                throw new Error(`Meal with ${id} does not exist`);
            }
            if(meal.catererId !== req.caterer.id){
                throw new Error('You are not allowed to do that');
            }
            await Meal.destroy({
                where: {
                    id: meal.id
                }
            });
            return res.status(200).json({
                status: 'success',
                message: 'Meal deleted successfully'
            });
        } catch(err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
        

    };

}

export default mealController;