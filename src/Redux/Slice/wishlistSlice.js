import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name:"wishlist",
    initialState:[],
    reducers:{
        // to define actions
        //Add to wishlist
        addToWishlist:((state,action)=>{
            state.push(action.payload)
        }),
        deleteFromWishlist:((state,action)=>{
              return state.filter(service=>service.title != action.payload)
        }) 
    }
})

export const {addToWishlist,deleteFromWishlist} = wishlistSlice.actions
export default wishlistSlice.reducer