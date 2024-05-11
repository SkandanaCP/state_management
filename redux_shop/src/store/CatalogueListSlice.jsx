import { createSlice } from "@reduxjs/toolkit";


const initialState={
    catalogue:[]
}
const CatalogueSlice=createSlice({
    name:'CatalogueSlice',
    initialState:initialState,
    reducers:{
  getCatalogue(state,action){
    state.catalogue=action.payload;
  },
  // deleteCatalogue(state,action){
  //   state.catalogue=action.payload
  // }
    }
})

export default CatalogueSlice.reducer
export const CatalogSliceAction=CatalogueSlice.actions;