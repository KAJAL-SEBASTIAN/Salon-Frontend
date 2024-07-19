import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
    name:'booking',
    initialState:[],
    reducers:{
        //add to booking
        addToBooking:((state,action)=>{
            state.push(action.payload)
        }),
        deleteFromBooking:((state,action)=>{
            return state.filter(service=>service.title != action.payload)
        }),
        emptyBooking:((state)=>{
            return state=[]
        })
    }
})

export const {addToBooking,deleteFromBooking,emptyBooking} = bookingSlice.actions
export default bookingSlice.reducer