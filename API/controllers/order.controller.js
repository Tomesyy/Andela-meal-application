import Order from '../models/order.model';
import OrderItem from '../models/orderItem.model';
import Meal from '../models/meal.model';
import Menu from '../models/menu.model';



class orderController  {
    static async addToUserOrder(req, res) {
        try {
            const { mealId, quantity } = req.body;
            const orderIni = await OrderItem.findOne({ where: { mealId, userId: req.user.id }});
            if(orderIni){
                return res.status(200).json({
                    message: 'Order already exists'
                });
            }
            const meal = await Meal.findOne({ where: { id: mealId }});
            if(quantity > meal.quantity){
                throw new Error(`we only have ${meal.quantity} of these item in stock`);
            }
            const newOrderItem = await OrderItem.create({ mealId, quantity, userId: req.user.id });
            return res.status(200).json({
                status: 'success',
                message: 'Successfully added OrderItem',
                data: newOrderItem
            });
        } catch(err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
        
    };
    static async fetchAllOrder(req, res){
        try {
            const orders = await Order.findAll({ where: { catererId: req.caterer.id }, include: { model: User, attribute: ['name'] }});
            if(orders.length === 0){
                return res.status(200).json({
                    status: 'success',
                    message: 'No order has been made yet'
                });
            }
            return res.status(200).json({
                status: 'success',
                message: 'Successfully feched orders',
                data: orders
            });
        } catch(err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
        
    };
    static async fetchOrderItems(req, res){
        try{
            const orderItems = await OrderItem.findAll({ where: { userId: req.user.id }, include: [Meal]});
            if(!orderItems){
                throw new Error('User has no order items')
            }
            let total = 0;
            const meals = [];
            orderItems.forEach(orderItem => {
                const safeMeal = {
                    name: orderItem.meal.dataValues.name,
                    price: orderItem.meal.dataValues.price,
                    orderQuantity: orderItem.quantity,
                    orderId: orderItem.id
                }
                meals.push(safeMeal);
                total += orderItem.quantity * orderItem.meal.dataValues.price;
            });
            const order = { meals, total };
            return res.status(200).json({
                status: 'success',
                message: 'Orders Retrieved',
                data: order
            });
        } catch(err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            });
        }
        
    };
    static async updateSingleOrder(req, res){
        try {
            const { orderId } = req.params;
            const { quantity } = req.body;
            const orderItem = await OrderItem.findOne({ where: { id: orderId, userId: req.user.id}, include:[Meal]});
            if( quantity > orderItem.meal.quantity ){
                throw new Error(`we only have ${orderItem.meal.quantity} of these item in stock`);
            }
            await OrderItem.update({ quantity: quantity },{ where: { id: orderItem.id }});
            return res.status(200).json({
                status: 'success',
                message: 'Updated Order successfully'
            });
        } catch(err){
            return res.status(500).json({
                status: 'error',
                message: err.message
            });
        }   
    };
    static async deleteSingleOrder(req, res){
        try {
            const { orderId } = req.params;
            const orderItem = await OrderItem.findOne({ where: { id: orderId, userId: req.user.id}});
            if(!orderItem){
                throw new Error(`Order does not exist`);
            }
            await OrderItem.destroy({ where: { id: orderItem.id }})
            return res.status(200).json({
                status: 'success',
                message: 'Order removed successfully'
            });
        } catch(err){
            return res.status(500).json({
                status: 'error',
                message: err.message
            });
        }  
        
    };

    static async checkOutOrder(req, res){
        try{
            const { billing_address } = req.body;
            if(!billing_address){
                throw new Error('Input the right paramters');
            }
            const orderItems = await OrderItem.findAll({ where: { userId: req.user.id }, include: [Meal]});
            if(orderItems.length === 0){
                throw new Error('User has no order');
            }
            const meals = [];
            const caterers = new Set();
            orderItems.forEach(orderItem => {
                const orderMeal = { ...orderItem };
                orderMeal.meal.dataValues.quantity = orderItem.dataValues.quantity;
                meals.push(orderMeal.meal.dataValues);
                caterers.add(orderMeal.meal.dataValues.catererId);
            });
            meals.forEach(async meal => {
                const dbMeal = await Meal.findOne({ where: {id: meal.id}});
                dbMeal.dataValues.quantity -= meal.quantity;
                await Meal.update({ quantity: dbMeal.dataValues.quantity}, { where: { id: meal.id }});
                const dbMenu = await Menu.findOne({ where: { catererId: meal.catererId}});
                const menuMeals = JSON.parse(dbMenu.dataValues.meals);
                const updatedMenuMeals = menuMeals.map(menuMeal => {
                    const updatedMenuMeal = { ...menuMeal };
                    if (menuMeal.id === meal.id) {
                    updatedMenuMeal.quantity -= meal.quantity;
                    }
                    return updatedMenuMeal;
                });
                await Menu.update({ meals: JSON.stringify(updatedMenuMeals) }, { where: { id: dbMenu.id } });
            });
            await OrderItem.destroy({ where: { userId: req.user.id } });
            caterers.forEach(async caterer => {
                let catererTotal = 0;
                const catererMeals = meals.filter(meal => meal.catererId === caterer);
                catererMeals.forEach(catererMeal => {
                    catererTotal += catererMeal.quantity * catererMeal.price;
                });
                await Order.create({
                    order: JSON.stringify(catererMeals),
                    total: catererTotal,
                    billing_address: billing_address,
                    catererId: caterer,
                    userId: req.user.id,
                    delivery_status: 0
                });
            });
            return res.status(201).json({
                status: 'success',
                message: 'Order Made'
            });
        } catch(err){
            return res.status(500).json({
                status: 'error',
                message: err.message
            });
        }  
        
    };
}

export default orderController;