import express from 'express';
const router = express.Router();
import {creditAccount, debitAccount, walletBalance} from '../controllers/transactionController'

router.post('/deposit', creditAccount);
router.post('/withdraw', debitAccount);
router.get('/balance', walletBalance);


export default router;