import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";
import { saveCartToStorage } from "../../utils/localStorage";

interface CartItem extends Product {
    qty: number;
}

export interface CartState {
    cartItems: CartItem[];
}

const initialState: CartState = {
    cartItems: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const item = state.cartItems.find(p => p._id === action.payload._id);
            if (item) {
                item.qty += 1;
            } else {
                state.cartItems.push({ ...action.payload, qty: 1});
            }
            saveCartToStorage(state.cartItems);
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter(p => p._id !== action.payload);
            saveCartToStorage(state.cartItems);
        },
        clearCart: (state) => {
            state.cartItems = [];
            saveCartToStorage(state.cartItems);
        },
        increaseQty: (state, action: PayloadAction<string>) => {
            const item = state.cartItems.find(p => p._id === action.payload);
            if (item) item.qty += 1;
            saveCartToStorage(state.cartItems);
        },
        decreaseQty: (state, action: PayloadAction<string>) => {
            const item = state.cartItems.find(p => p._id === action.payload);
            if (item && item.qty>1) item.qty -=1;
            saveCartToStorage(state.cartItems);
        },
        loadCartFromDB: (state, action: PayloadAction<CartItem[]>) => {
            state.cartItems = action.payload;
            saveCartToStorage(state.cartItems);
        }
    },
});

export const { addToCart, removeFromCart, clearCart, increaseQty, decreaseQty, loadCartFromDB } = cartSlice.actions;
export default cartSlice.reducer;