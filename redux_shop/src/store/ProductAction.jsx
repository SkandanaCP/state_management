import { ProductActions } from "./ProductSlice";
import { getCatalogue,addItemsToCart,getItemsToCart,updateItemsToCart,removeItemsToCart } from "../components/appConstants/manageCatalogue";
export const getAllProducts=()=>{
    return async(dispatch)=>{
const response=await getCatalogue();
dispatch(ProductActions.getCatalogue(response.data))
    }
}

export const addItemsToCarts = (data) => {
    return async (dispatch) => {
     
      try {
        const newItem={...data,quantity:1,total:data.amount}
 const response=await addItemsToCart(newItem)
 console.log(response.data)
 await dispatch(ProductActions.updateItemToCart(response.data))
  dispatch(getCartItems());
   
      } catch (error) {
        console.error("Error adding items to cart:", error);
        // Handle any errors here, such as dispatching an error action or displaying a message to the user
      }
    };
  };
  

export const updateCartItem=(id,data,type)=>{
    return async(dispatch)=>{
      try{
        const updateData={...data}
       if(type==='increment'){
        updateData.quantity=Number(updateData.quantity)+1;
        updateData.total=Number(updateData.total)+Number(updateData.amount)
       }else if(type==='decrement'){
        updateData.quantity=Number(updateData.quantity)-1;
        updateData.total=Number(updateData.total)-Number(updateData.amount)
       }  
       else{
        updateData
       }   
        console.log(updateData,"update item data")
        const response=await updateItemsToCart(id,updateData)
         console.log(response.data,"update item response")
        await dispatch(getCartItems())
        dispatch(ProductActions.updateItemToCart(response.data))
     
      }catch (error) {
        console.error("Error adding items to cart:", error);
        // Handle any errors here, such as dispatching an error action or displaying a message to the user
      }
       
    }
}
export const getCartItems=()=>{
    return async (dispatch)=>{
        const response=await getItemsToCart()
        dispatch(ProductActions.addItemToCart(response.data))
    }
}
export const removeCartItems=(data)=>{
  return async(dispatch)=>{
    const response=await removeItemsToCart(data)
    if(response.data){
      dispatch(getCartItems())
    }

  }
}
export default {getAllProducts,addItemsToCarts,getCartItems,updateCartItem}