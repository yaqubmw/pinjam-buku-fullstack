import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Book } from 'store/types';

export const fetchBooks = createAsyncThunk<Book[]>('books/fetchBooks', async () => {
    const response = await axios.get('/api/books');
    return response.data.filter((book: { stock: number }) => book.stock > 0);
});

const bookSlice = createSlice({
    name: 'books',
    initialState: [] as Book[],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBooks.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

const bookReducer = bookSlice.reducer;

export default bookReducer