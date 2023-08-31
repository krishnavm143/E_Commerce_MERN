import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, PRODUCT_URL } from '../constants';

export const fetchProductDetails = createAsyncThunk(
  'fetch/productDetails',
  async (id) => {
    const response = await axios(`${BASE_URL}${PRODUCT_URL}/${id}`);
    return response.data;
  }
);
const initialState = {
  status: 'idle',
  error: null,
  productDetails: null,
};
const productDetailApiSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductDetails.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.status = 'idle';
      state.productDetails = action.payload;
    });
    builder.addCase(fetchProductDetails.rejected, (state) => {
      state.status = 'error';
      state.error = true;
    });
  },
});

export default productDetailApiSlice.reducer;
