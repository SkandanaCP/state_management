import { CreateCatalogueAction } from "./CreateCatalogueSlice";
import { postCatalogue } from "../components/appConstants/manageCatalogue";
export const handleCatalogueAction=(data)=>{
    return async(dispatch)=>{
const response=await postCatalogue(data)
dispatch(CreateCatalogueAction.handleCatalogueSubmit(response.data))
dispatch(CreateCatalogueAction.handleInputChange({data:"name",val:""}))
dispatch(CreateCatalogueAction.handleInputChange({data:"amount",val:""}))
dispatch(CreateCatalogueAction.handleInputChange({data:"description",val:""}))
dispatch(CreateCatalogueAction.handleInputChange({data:"itemsLeft",val:""}))
dispatch(CreateCatalogueAction.handleInputChange({data:"maxItems",val:""}))
dispatch(CreateCatalogueAction.handleInputChange({data:"category",val:""}))
    }
}
export default {handleCatalogueAction}