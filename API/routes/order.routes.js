import { Router } from 'express';



//controller
import orderController from '../controllers/order.controller';



const router = Router();

router.get('/', orderController.fetchAllOrder);
router.post('/', orderController.addOrder);
router.put('/:id', orderController.updateSingleOrder);
router.delete('/:id', orderController.deleteSingleOrder);



export default router;