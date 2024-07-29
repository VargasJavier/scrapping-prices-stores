import express from 'express';
import productRoutes from '../src/routes/productRoutes.js';
import { PORT } from '../src/config/config.js';

const app = express();

app.use(express.json());
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
