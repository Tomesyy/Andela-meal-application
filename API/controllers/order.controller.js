import orderService from '../services/order.service';

const orderController = {
    fetchAllOrder(req, res){
        const allOrder = orderService.fetchAllOrder();
        res.json({
            status: 'success',
            data: allOrder
        }).status(200);
    },
    addOrder(req, res){
        const newOrder = req.body;
        const createdOrder = orderService.addOrder(newOrder);
        res.json({
            status: 'success',
            data: createdOrder
        }).status(201);
    },
    updateSingleOrder(req, res){
        const newUpdate = req.body;
        const id = req.params.id;
        const updateOrder = orderService.updateOrder(id, newUpdate);
        res.json({
            status: 'success',
            data: updateOrder
        }).status(201);

    }
}