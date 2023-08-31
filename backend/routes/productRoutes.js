import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import {
  getProductById,
  getProducts,
} from '../controller/productController.js';

const router = express.Router();

// router.get(
//   '/',
//   asyncHandler(async (req, res) => {

//   })
// );

// router.get(
//   '/:id',
//   asyncHandler(async (req, res) => {

//   })
// );

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);
export default router;
