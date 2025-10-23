import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ShippingAddress {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
}

interface OrderState {
    shippingAddress: ShippingAddress;
}

const initialState: OrderState = {
    shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress')!)
    : { 
        name: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
    },
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        saveShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
            state.shippingAddress = action.payload;
            localStorage.setItem('shippingAddress', JSON.stringify(action.payload))
        },
        clearShippingAddress: (state) => {
            const emptyshippingAddress = {
                name: '',
                address: '',
                city: '',
                postalCode: '',
                country: '',
              };

            state.shippingAddress = emptyshippingAddress;
        
              localStorage.setItem('shippingAddress', JSON.stringify(emptyshippingAddress));
        }
    },
});

export const { saveShippingAddress, clearShippingAddress } = orderSlice.actions;
export default orderSlice.reducer;