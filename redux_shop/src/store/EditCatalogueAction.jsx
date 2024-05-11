import { EditCategoryAction } from "./EditCatalogue";
import { editCatalogue } from "../components/appConstants/manageCatalogue";
export const handleFormSubmit=(id,data)=>{
    return async(dispatch)=>{
        const response=await editCatalogue(id,data)
        dispatch(EditCategoryAction.handleCatalogueSubmit(response.data))
        
    }
}
export default {handleFormSubmit}