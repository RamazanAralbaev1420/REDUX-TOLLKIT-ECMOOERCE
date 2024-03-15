import { configureStore } from '@reduxjs/toolkit';
import commerseSlice from '../slices/commerseSlice';
import cartProductsSlice from '../slices/cartProductsSlice';

export const store = configureStore({
  reducer: {
    products: commerseSlice,
    cartProducts: cartProductsSlice,
  },
});
