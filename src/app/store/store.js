import { configureStore } from '@reduxjs/toolkit';
import  commerseSlice  from '../slices/commerseSlice';

export const store = configureStore({
  reducer: {
    products: commerseSlice,
  },
});
