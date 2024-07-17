import { configureStore } from '@reduxjs/toolkit';
import noteSlice from './Slice/noteSlice';

const store = configureStore({
    reducer:{
        note : noteSlice
    }
})

export default store
