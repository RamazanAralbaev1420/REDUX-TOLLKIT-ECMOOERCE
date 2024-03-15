import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartProducts: [],
  price: 0,
};

export const cartProductsSlices = createSlice({
  name: 'cartProducts',
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.cartProducts.push(action.payload);
    },

    increment: (state, action) => {
      state.cartProducts.map((product) => {
        if (product.id === action.payload.id) {
          return (product.count += 1);
        }
      });
    },
    decrement: (state, action) => {
      state.cartProducts.map((product) => {
        if (product.id === action.payload.id && product.count > 1) {
          return (product.count -= 1);
        }
      });
    },
    priceProductsAll: (state) => {
      state.price = state.cartProducts.map(
        (item) => (state.price += item.price)
      );
    },
    deleteProduct: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (product) => product.id !== action.payload
      );
    },
    clearProducts: (state) => {
      state.cartProducts.length = 0;
      state.cartProducts = [];
    },
  },
});

export const {
  addCart,
  increment,
  decrement,
  deleteProduct,
  priceProductsAll,
  clearProducts,
} = cartProductsSlices.actions;

export default cartProductsSlices.reducer;
