import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Customer } from "store/types";

export const fetchCustomers = createAsyncThunk<Customer[]>('customers/fetchCustomers', async () => {
    const response = await axios.get('/api/customers');
    return response.data;
});

const customerSlice = createSlice({
    name: 'customers',
    initialState: [] as Customer[],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCustomers.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

const customerReducer = customerSlice.reducer;

export default customerReducer