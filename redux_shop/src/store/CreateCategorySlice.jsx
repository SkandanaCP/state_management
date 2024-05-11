import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  input: {
    category: "",
  },
  submitValues: [],
  categories: [],
};

export const CreateCategorySlice = createSlice({
  name: "createCategory",
  initialState: initialState,
  reducers: {
    handleInputChange(state, action) {
    
      state.input = {...state.input, [action.payload.data]: action.payload.val };
      console.log(state.input, "from reducers");
    },
    handleCategorySubmit(state, action) {
      state.submitValues = action.payload;
    },
    handlegetCategories(state, action) {
      state.categories = action.payload;
    },
  },
});

export const CreateCategoryAction = CreateCategorySlice.actions;

export default CreateCategorySlice.reducer;
