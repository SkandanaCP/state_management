import { CatalogSliceAction } from "./CatalogueListSlice";
import { getCatalogue } from "../components/appConstants/manageCatalogue";
import { deleteCatalogue } from "../components/appConstants/manageCatalogue";
export const getAllCatalogues=()=>{
    return async(dispatch)=>{
        const response=await getCatalogue();
        dispatch(CatalogSliceAction.getCatalogue(response.data))
    }
}

export const handledeleteCatalogue=(data)=>{
    return async(dispatch)=>{
        const response=await deleteCatalogue(data)
        //dispatch(CatalogSliceAction.deleteCatalogue(response.data))
       dispatch(getAllCatalogues())
    }

}
export default {getAllCatalogues};