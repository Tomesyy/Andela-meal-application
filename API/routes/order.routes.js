import { Router } from 'express';



//controller
import orderController from '../controllers/order.controller';
//auth controllers
import AuthController from '../controllers/auth.controller';


const router = Router();

router.get('/', AuthController.verifyAdmin, orderController.fetchAllOrder);
router.post('/', AuthController.verifyUser, orderController.addOrder);
router.put('/:id', AuthController.verifyUser, orderController.updateSingleOrder);
router.delete('/:id', AuthController.verifyUser, orderController.deleteSingleOrder);



export default router;