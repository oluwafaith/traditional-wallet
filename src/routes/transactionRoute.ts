import express from 'express';
const router = express.Router();
import {creditAccount, debitAccount, walletBalance} from '../controllers/transactionController'
import {
    authenticateUser,
    authorizePermissions,
  } from '../middleWare/authentication';

router.post('/deposit', creditAccount);
router.post('/withdraw', authenticateUser, debitAccount);
router.get('/balance',authenticateUser, walletBalance);


export default router;