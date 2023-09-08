import asyncHandler from '../middleware/asyncHandler.js';
import User from '../model/userModel.js';


// @desc auth user and get token
// @routes /api/user.login
// @access  public
const getProd   ucts = asyncHandler(async (req, res) => {
  const products = await User.find();
  res.json(products);
});
