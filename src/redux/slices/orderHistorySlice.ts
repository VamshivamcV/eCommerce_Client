import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthHeaders } from "../../utils/authHeaders";

interface orderHistoryState {
    orders: any[];
    loading: boolean;
    error: string | null;
}

const initialState: orderHistoryState = {
    orders: [],
    loading: false,
    error: null,
};

const url = process.env.REACT_APP_API_URL;


export const fetchMyOrders = createAsyncThunk('orders/fetchMyOrders', async () => {
    const { data } = await axios.get(`${url}/orders/myorders`, getAuthHeaders());
    return data;
});

const orderHistorySlice = createSlice({
    name: 'orderHistory',
    initialState: initialState,
    reducers: {},
    extraReducers: ( builder ) => {
        builder
            .addCase(fetchMyOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyOrders.fulfilled, (state, action) => {
                state.loading =false;
                state.orders = action.payload;
            })
            .addCase(fetchMyOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch orders';
            });
    },
});

export default orderHistorySlice.reducer;