import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const submitTransaction = createAsyncThunk(
    'transactions/submit',
    async (data: { customer_id: string; book_id: string; price: number; rent_date: string }, { rejectWithValue }) => {
        try {
            await axios.post('/api/transactions', data);

            const { data: bookData } = await axios.get(`/api/books/${data.book_id}`);
            const updatedStock = bookData.stock - 1;
            await axios.put(`/api/books/${data.book_id}`, { stock: updatedStock });

            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
