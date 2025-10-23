import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './slices/cartSlice';
import { localCartFromStorage } from "../utils/localStorage";
import authReducer from "./slices/authSlice";
import orderReducer from './slices/orderSlice';
import orderHistoryReducer from './slices/orderHistorySlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        order: orderReducer,
        orderHistory: orderHistoryReducer,
    },
    preloadedState: {
        cart: {
            cartItems: localCartFromStorage(),
        }
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;