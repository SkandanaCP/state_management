import { createSlice } from "@reduxjs/toolkit";
const initialState={
    input:{name:'',amount:'',description:'',itemsLeft:'',maxItems:'',category:''},
   catalogue:[],
   item:{}
}
const CreateCatalogueSlice =createSlice({
    name:'createCatalogue',
    initialState:initialState,
    reducers:{
        handleInputChange(state,action){
            const updatedInput = { ...state.input, [action.payload.data]: action.payload.val };
            console.log(updatedInput, "from reducers"); 
            state.input = updatedInput;
        },
        handleCatalogueSubmit(state,action){
        state.catalogue=action.payload;
        }
    }
})
export const CreateCatalogueAction=CreateCatalogueSlice.actions
export default CreateCatalogueSlice.reducer