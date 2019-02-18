import dummyData from '../utils/dummyData';
import Order from '../models/order.model';

const orderService = {
    fetchAllOrder(){
        const validOrders = dummyData.orders.map((order) => {
            const newOrder = new Order();
            newOrder.id = order.id;
            newOrder.name = order.name;
            newOrder.quantity = order.quantity;
            newOrder.address = order.address;
            newOrder.price = order.price;
            return newOrder;
        });
        return validOrders;
    },
    addOrder(order) {
        const orderLength = dummyData.orders.length;
        const lastId = dummyData.orders[orderLength - 1].id;
        const newId = lastId + 1;
        order.id = newId;
        dummyData.orders.push(order);
        return order;
    },
    updateOrder(id, order){
        const orderUpdate = dummyData.orders.find(order => order.id == id);
        orderUpdate.name = order.name;
        orderUpdate.quantity = order.quantity;
        orderUpdate.address = order.address;
        orderUpdate.price = order.price;
        return orderUpdate;
    }
}

export default orderService;