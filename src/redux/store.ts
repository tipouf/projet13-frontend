import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';

const reducer = {
  auth: authReducer,
  user: userReducer
}

export const store = configureStore({
  reducer: reducer,
  devTools: true
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;