import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    status: '',
    error: null,
    stories: []
}

const storySlice = createSlice({
    name: 'stories',
    initialState,
    reducers: {

    },
    extraReducers: {

    }
})

export default storySlice.reducer;