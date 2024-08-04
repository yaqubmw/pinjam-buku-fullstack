import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Transaction } from 'store/types';

export const fetchTransactions = createAsyncThunk<Transaction[]>('transactions/fetchTransactions', async () => {
    const response = await axios.get('/api/transactions');
    return response.data;
});

const transactionSlice = createSlice({
    name: 'transactions',
    initialState: {
        transactions: [] as Transaction[],
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
});

export default transactionSlice.reducer;
