import express from 'express';
import productRoutes from './routes/productRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import connectDb from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddelware.js';
connectDb(); //connect to mongo

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('Api is running');
});

app.use('/api/products', productRoutes);
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running at port :${PORT}`));
