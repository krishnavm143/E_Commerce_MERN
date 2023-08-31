import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, PRODUCT_URL } from '../constants';

export const fetchAllProducts = createAsyncThunk('fetch/products', async () => {
  const response = await axios(`${BASE_URL}${PRODUCT_URL}`);
  return response.data;
});

const initialState = {
  products: [],
  status: 'idle',
  error: null,
};
const productApiSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.status = 'idle';
      state.products = action.payload;
    });
    builder.addCase(fetchAllProducts.rejected, (state) => {
      state.status = 'error';
      state.error = true;
    });
  },
});

export default productApiSlice.reducer;
