import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  token: '',
  price: 0,
};

export const commerseSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    allProductsStore: (state, action) => {
      state.products = action.payload;
    },

    getToken: (state, action) => {
      state.token = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
      console.log(action.payload);
    },
  },
});

export const { allProductsStore, addCart, addProduct } = commerseSlice.actions;

export default commerseSlice.reducer;
