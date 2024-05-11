import { createSlice } from "@reduxjs/toolkit";


const initialState={
    Catalogue:[],
    cartItems:[],
    CategoryItems:[],
    item:{}
}
export const ProductSlice=createSlice({
    name:'product slice',
    initialState:initialState,
    reducers:{
        getCatalogue(state,action){
            state.Catalogue=action.payload
            state.CategoryItems=action.payload
        },
        addItemToCart(state, action) {
            console.log(action.payload)
          state.cartItems=action.payload
          console.log(action.payload,"from reducers")
          
        },
        updateItemToCart(state,action){
        state.item=action.payload
        },
        filterCatalogue(state,action){
            state.CategoryItems=action.payload
        },
        
    }
})

export default ProductSlice.reducer;
export const ProductActions=ProductSlice.actions