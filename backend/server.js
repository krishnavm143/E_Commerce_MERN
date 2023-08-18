import express from 'express';
import products from './data/products.js';
import dotenv from 'dotenv'
dotenv.config()
const app = express();
const PORT = process.env.PORT||5000;

app.get('/', (req, res) => {
  res.send('Api is running');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id',(req,res)=>{
    const productId=req.params.id
    const product=products.find(p=>p._id===productId)
    res.json(product)
})

app.listen(PORT, () => console.log(`Server running at port :${PORT}`));
