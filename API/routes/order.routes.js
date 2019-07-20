import { Router } from 'express';



//controller
import orderController from '../controllers/order.controller';
//auth controllers
import AuthController from '../controllers/auth.controller';


const router = Router();

router.get('/', AuthController.verifyAdmin, orderController.fetchAllOrder);
router.get('/user', AuthController.verifyUser, orderController.fetchOrderItems);
router.post('/', AuthController.verifyUser, orderController.addToUserOrder);
router.put('/:orderId', AuthController.verifyUser, orderController.updateSingleOrder);
router.delete('/:orderId', AuthController.verifyUser, orderController.deleteSingleOrder);
router.post('/checkout', AuthController.verifyUser, orderController.checkOutOrder);



export default router;