import { getPricesForProduct } from '../services/scraperService.js';

export const getProductPrices = async (req, res) => {
  try {
    const { searchName } = req.body;
    const result = await getPricesForProduct(searchName);
    res.json(result);
  } catch (error) {
    console.error('Error en getProductPrices:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getProductList = async (req, res) => {
  try {
    res.json([
      {
        "name": "Descompilados",
        "products": []
      }
    ]);
  } catch (error) {
    console.error('Error en getProductPrices:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
