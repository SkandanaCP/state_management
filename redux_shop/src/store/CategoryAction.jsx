import { CreateCategoryAction } from "./CreateCategorySlice";
import { postCategory } from "../components/appConstants/manageCatalogue";
import { getCategory } from "../components/appConstants/manageCatalogue";

export const postCategoryAction = (data) => {
  return async (dispatch) => {
    console.log(data, "daata eing consoled2");
    const response = await postCategory(data);
      dispatch(getAllCategories());
    console.log(response.data);
    dispatch(CreateCategoryAction.handleCategorySubmit(response.data));

    
  };
};

export const getAllCategories = () => {
  return async (dispatch) => {
    const response = await getCategory();
    dispatch(CreateCategoryAction.handlegetCategories(response.data));
  };
};
export default { postCategoryAction, getAllCategories };
