import express from 'express';
import { orderProduct, purchaseProduct } from '../controllers/purchaseController';
import { authenticateUser } from '../middleWare/authentication';
const router = express.Router();

router
  .route('/')
  .post(authenticateUser, orderProduct )
 router
 .route('/checkout').post(authenticateUser, purchaseProduct )


export default router;