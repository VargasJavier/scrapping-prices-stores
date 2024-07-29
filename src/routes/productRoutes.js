import express from 'express';
import { getProductList, getProductPrices } from '../controllers/productController.js';

const router = express.Router();

router.post('/getPrices', getProductPrices);
router.get('/list', getProductList);

export default router;
