import { Router } from 'express';


//controller
import orderController from '../controllers/order.controller';



const router = Router();

router.get('/', orderController.fetchAllOrder);
router.post('/', orderController.addOrder);
router.put('/:id', orderController.updateSingleOrder);



export default router;