import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  token: '',
  cartProducts: [],
  price: 0,
};


export const commerseSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    allProductsStore: (state, action) => {
      state.products = action.payload;
    },
    addCart: (state, action) => {
      state.cartProducts.push(action.payload);
    },
    getToken: (state, action) => {
      state.token = action.payload;
    },

    increment: (state, action) => {
      // state.cartProducts.count += 1;
      console.log(state.cartProducts);
      // console.log(state.products);
    },
    decrement: (state, action) => {
      state.cartProducts.count -= 1;
    },

    deleteProduct: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const {
  allProductsStore,
  addCart,
  increment,
  decrement,
  deleteProduct,
} = commerseSlice.actions;

export default commerseSlice.reducer;
