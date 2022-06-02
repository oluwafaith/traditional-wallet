import express from 'express';
import { getAllProducts, 
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage} from '../controllers/productController'

const router = express.Router();

router
  .route('/')
  .post(createProduct)
//   .post([authenticateUser, authorizePermissions('admin')], createProduct)
  .get(getAllProducts);

  router
  .route('/uploadImage')
  .post( uploadImage);
//   .post([authenticateUser, authorizePermissions('admin')], uploadImage);

router
  .route('/:id')
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);
//   .patch([authenticateUser, authorizePermissions('admin')], updateProduct)
//   .delete([authenticateUser, authorizePermissions('admin')], deleteProduct);


export default router;