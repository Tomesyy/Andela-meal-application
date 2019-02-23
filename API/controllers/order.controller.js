import orderService from '../services/order.service';



const orderController = {
    fetchAllOrder(req, res){
        const allOrder = orderService.fetchAllOrder();
        return res.status(200).json({
            status: 'success',
            data: allOrder
        });
    },
    addOrder(req, res){
        const newOrder = req.body;

        if(!newOrder.name || !newOrder.price || !newOrder.delivery || !newOrder.delivery || !newOrder.quantity){
            return res.status(400).json({
                status: 'error',
                data: 'Input the Parameters Rightly'
            });
        }

        const createdOrder = orderService.addOrder(newOrder);
        return res.status(201).json({
            status: 'success',
            data: createdOrder
        });
    },
    updateSingleOrder(req, res){
         const newUpdate = req.body;
         const { id } = req.params;

         if(Number.isNaN(Number(id))) {
            return res.status(400).json({
                message: 'Please make sure you input a Number'
            });
        }

         const updateOrder = orderService.updateOrder(id, newUpdate);
         return res.status(201).json({
             status: 'success',
             data: updateOrder
         });
    }
}

export default orderController;