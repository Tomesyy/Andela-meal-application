import orderService from '../services/order.service';



const orderController = {
    fetchAllOrder(req, res){
        const allOrder = orderService.fetchAllOrder();
        return res.json({
            status: 'success',
            data: allOrder
        }).status(200);
    },
    addOrder(req, res){
        /*
           Expect json of the format

           {
               name: 'food',
               size: 'Large',
               price: 900
           }
        */

        const newOrder = req.body;
        const createdOrder = orderService.addOrder(newOrder);
        return res.json({
            status: 'success',
            data: createdOrder
        }).status(201);
    },
    updateSingleOrder(req, res){
         const newUpdate = req.body;
         const id = req.params.id;
         const updateOrder = orderService.updateOrder(id, newUpdate);
         return res.json({
             status: 'success',
             data: updateOrder
         }).status(200);
    }
}

export default orderController;