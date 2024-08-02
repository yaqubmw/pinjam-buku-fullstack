import { createSlice } from '@reduxjs/toolkit';
import { submitTransaction } from './actions';

interface TransactionsState {
    loading: boolean;
    error: string | null;
}

const initialState: TransactionsState = {
    loading: false,
    error: null,
};

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(submitTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitTransaction.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(submitTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

const TransactionsReducer = transactionsSlice.reducer;
export default TransactionsReducer;
