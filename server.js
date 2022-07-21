import express from 'express';
import './config/db.js';
import CustomerRoutes from './Routes/CustomerRoutes.js';
import ProductRoutes from './Routes/ProductRoutes.js';
import OrderRoutes from './Routes/OrderRoutes.js';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/api/customer', CustomerRoutes);
app.use('/api/product', ProductRoutes);
app.use('/api/order', OrderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
