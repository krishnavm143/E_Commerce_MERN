import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../model/productModel.js';


// @desc Fetch All Products
// @routes /api/products
// @access  public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// @desc Fetch Particular Product
// @routes /api/products/:id
// @access  public
const getProductById = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    res.json(product);
  }
  res.status(400);
  throw new Error('Resource Not Found');
});

export { getProductById, getProducts };
