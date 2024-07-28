import express from 'express';
import { getProductPrices } from '../controllers/productController.js';

const router = express.Router();

router.post('/getPrices', getProductPrices);

export default router;
