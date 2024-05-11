import { createSlice } from "@reduxjs/toolkit";
const initialState={
    item:{name:'',amount:'',description:'',itemsLeft:'',maxItems:'',category:''}
}
const EditCategorySlice=createSlice({
  name:'editCategorySlice',
  initialState:initialState,
  reducers:{
    handlePageLoad(state,action){
    state.item=action.payload
    },
    handleInputChange(state,action){
      const updateItem={...state.item,[action.payload.data]:action.payload.val}
      state.item=updateItem
    },
    handleCatalogueSubmit(state,action){
      state.item=action.payload
    }
  } 
})
export const EditCategoryAction=EditCategorySlice.actions;
export default EditCategorySlice.reducer;