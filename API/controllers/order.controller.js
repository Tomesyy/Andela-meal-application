import Order from '../models/order.model';
import OrderItem from '../models/orderItem.model';
import Meal from '../models/meal.model';



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
            return req.status(200).json({
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
    static async addOrder(req, res){
        
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
    };
}

export default orderController;