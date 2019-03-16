import orderService from '../services/order.service';



const orderController = {
    fetchAllOrder(req, res){
        const allOrder = orderService.fetchAllOrder();
        return allOrder
            .then(order => {
                res.status(201).json({
                    status: 'success',
                    data: order
                })
            })
            .catch(err => console.log(err));
    },
    addOrder(req, res){
        const newOrder = req.body;

        if(!newOrder.order || !newOrder.total || !newOrder.billing_address || !newOrder.catererId || !newOrder.userId){
            return res.status(400).json({
                status: 'error',
                data: 'Input the Parameters Rightly'
            });
        }

        const createdOrder = orderService.addOrder(newOrder);
        return createdOrder
            .then(order => {
                res.status(201).json({
                    status: 'success',
                    data: order
                })
            })
            .catch(err => console.log(err));
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
         return updateOrder
            .then(order => {
                res.status(200).json({
                    status: 'success',
                    data: order
                });
            })
            .catch(err => console.log(err));
    },
    deleteSingleOrder(req, res){
        const id = req.params.id;
        const deleteOrder = orderService.deleteOrder(id);

        if(deleteOrder == null) {
            return res.status(400).json({
                message: `cannot delete order with id ${id} now`
            });
        }
        return deleteOrder
            .then(order => {
                res.status(200).json({
                    status: 'success',
                    data: order
                });
            })
            .catch(err => console.log(err)); 

    }
}

export default orderController;