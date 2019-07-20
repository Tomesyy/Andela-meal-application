import Menu from '../models/menu.model';
import Caterer from '../models/caterers.model';
import Meal from '../models/meal.model';


class menuController  {
    static async fetchAllMenu(req, res){
        try{
            const today = menuController.todaysDateGenerator();
            const menus = await Menu.findAll({ where: { createdAt: today }, include: [{model: Caterer, attributes: ['catering_Company']}]});
            if(menus.length === 0){
                return res.status(200).json({
                    status: 'success',
                    message: 'No menu has been set for today'
                });
            }
            return res.status(200).json({
                status: 'success',
                message: 'successfully fetched menus',
                data: menus
            });
        } catch(err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
        
    };
    static async addMealToMenu(req, res){
        try{
            const { mealId, quantity } = req.body;
            if(!mealId || !quantity ) {
                return res.status(400).json({
                    status: 'error',
                    data: 'Input the Parameter Rightly'
                });
            }
            const meal = await Meal.findOne({ where: { id: mealId, catererId: req.caterer.id }});
            if(!meal){
                throw new Error(`meal with id ${mealId} does not exist for you`);
            }
            meal.dataValues.quantity = Number(quantity);
            const safeMeal = {
                id: meal.dataValues.id,
                name: meal.dataValues.name,
                price: meal.dataValues.price,
                imageUrl: meal.dataValues.imageUrl,
                quantity,
                catererId: meal.dataValues.catererId
            }
            const today = menuController.todaysDateGenerator();
            const menu = await Menu.findAll({ where: { createdAt: today, catererId: req.caterer.id }});
            let menuMeals = [];
            if(menu.length === 0){
                menuMeals.push(safeMeal);
                await Menu.create({
                    meals: JSON.stringify(menuMeals),
                    catererId: req.caterer.id
                });
                await Meal.update({ quantity }, { where: { id: mealId}});
                return res.status(200).json({
                    status: 'success',
                    message: 'successfully added to menu',
                    data: safeMeal
                });
            } else {
                menuMeals = JSON.parse(menu[0].dataValues.meals);
                menuMeals.forEach(menuMeal => {
                    if(menuMeal.id !== Number(mealId)){
                        menuMeals.push(safeMeal);
                    } else {
                        throw new Error('Meal already added to menu')
                    }
                });
                await Menu.update(
                    { meals: JSON.stringify(menuMeals) },
                    { where: {catererId: req.caterer.id, createdAt:today }}
                )
                const mealIndex = menuMeals.findIndex(menuMeal => menuMeal.id === Number(mealId));
                await Meal.update({ quantity: menuMeals[mealIndex].quantity }, { where: { id: mealId } });
                return res.status(200).json({
                    status: 'success',
                    message: 'Menu updated successfully',
                    data: menuMeals
                });
            }
            
        } catch(err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
        
        
    };

    static todaysDateGenerator() {
        const date = new Date();
        const month = `${date.getMonth() + 1}`;
        const today = `${date.getFullYear()}-${month.padStart(2, '0')}-${date.getDate()}`;
        return today;
    };
}

export default menuController;