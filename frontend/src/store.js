import { configureStore } from '@reduxjs/toolkit';
import getProductApi from './slices/productsApiSlice';
import getProductDetailApi from './slices/productDetailApiSlice';
import cartSliceReducer from './slices/cartSlice';
const store = configureStore({
  reducer: {
    products: getProductApi,
    productDetail: getProductDetailApi,
    cart: cartSliceReducer,
  },
});

export default store;
