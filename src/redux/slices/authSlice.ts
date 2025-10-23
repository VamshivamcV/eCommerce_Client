import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ShippingAddress {
    address: string;
    city: string;
    postalCode: string;
    country: string;
}

export interface UserInfo {
    _id: string;
    name: string;
    email: string;
    shippingAddress: ShippingAddress;
    token: string;
}

export interface AuthState {
    userInfo: UserInfo | null;
}

const userFromStorage = localStorage.getItem('userInfo');

const initialState: AuthState = {
    userInfo: userFromStorage ? JSON.parse(userFromStorage) : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<UserInfo>) {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout(state) {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;