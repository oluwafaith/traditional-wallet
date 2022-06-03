import express from 'express';
const router = express.Router();
import { getAllProducts, 
    createProduct,
    getSingleProduct,
  
  } from '../controllers/productController'
    import {
      authenticateUser,
      authorizePermissions,
    } from '../middleWare/authentication';


router
  .route('/')
  .post([authenticateUser, authorizePermissions('admin')], createProduct)
  .get(getAllProducts);

router
  .route('/:id')
  .get(getSingleProduct)
 
export default router;