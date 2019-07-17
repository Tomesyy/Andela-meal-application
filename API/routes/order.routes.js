import { Router } from 'express';



//controller
import orderController from '../controllers/order.controller';
//auth controllers
import AuthController from '../controllers/auth.controller';


const router = Router();

router.get('/', AuthController.verifyAdmin, orderController.fetchAllOrder);
router.post('/', AuthController.verifyUser, orderController.addOrder);
router.put('/:orderId', AuthController.verifyUser, orderController.updateSingleOrder);
router.delete('/:orderId', AuthController.verifyUser, orderController.deleteSingleOrder);



export default router;