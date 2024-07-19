import { configureStore } from "@reduxjs/toolkit";
import wishlistSlice from "./Slice/wishlistSlice";
import bookingSlice from "./Slice/bookingSlice";

const store = configureStore({
    reducer:{
        wishlistReducer:wishlistSlice,
        bookingReducer:bookingSlice
    }
})

export default store