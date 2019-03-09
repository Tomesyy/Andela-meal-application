import dummyData from '../utils/dummyData';
import Order from '../models/order.model';

const orderService = {
    fetchAllOrder(){
        return Order.findAll();
    },
    addOrder(order) {
        return Order.create(order);
    },
    updateOrder(id, order){
        return Order.update(
            {
                order: order.order,
                delivery_status: order.delivery_status,
                total: order.total,
                userId: order.userId,
                catererId: order.catererId,
                billing_address: order.billing_address
            },
            {
                where: {
                    id: id
                }
            }
        );
    },
    deleteOrder(id){
        return Order.destroy({
            where: {
                id: id
            }
        });
    }
}

export default orderService;