import React, { createContext, useReducer, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import Category from "./Category";
import ProductList from "./ProductList";
import { getCatalogue, getCategory,addCartItems,getCartItems,updateCartItems } from "../appConstants/manageCatalogue";
const initialState = {
  category: [],
  catalogue: [],
  filteredValues:[],
  input:{category:''},
  cartItems:[]
};
const reducer = (state, action) => {
  if (action.type === "get_category") {
    return { ...state, category: action.payload };
  } else if (action.type === "get_catalogue") {
    return { ...state, catalogue: action.payload};
  }
  else if (action.type === "filter_catalogue") {
    return { ...state, filteredValues: action.payload};
  }
  else if(action.type==='handleChange'){ 
    return {...state,input:{...state.input,[action.payload1]:action.payload2}}
  }
  else if(action.type='cartItems'){
return {...state,cartItems:action.payload}
  }
};
export const productContext = createContext();
const Products = () => {
  const [finalState, dispatch] = useReducer(reducer, initialState);
const navigate=useNavigate();
  const getAllCategories = async () => {
    try {
      const response = await getCategory();
      if (response.data) {
        dispatch({ type: "get_category", payload: response.data });
      }
    } catch (error) {
      console.error("something went wrong while fetching the categories");
    }
  };
  const getAllCatalogue = async () => {
    try {
      const response = await getCatalogue();
      if (response.data) {
        dispatch({ type: "get_catalogue", payload: response.data });
        dispatch({ type: "filter_catalogue", payload: response.data });
      }
    } catch (error) {
      console.error("something went wrong while fetching the categories");
    }
  };

  const onInputChange=(event,name)=>{
dispatch({type:'handleChange',payload1:name,payload2:event.target.value})
const val=event.target.value
const newArray=[...finalState.catalogue]
console.log(newArray,"new array")
if(val==='Shop All'){
  dispatch({type:'filter_catalogue',payload:newArray})
  
}else{
  const input=newArray.filter(item=>item.category.trim().toLowerCase()===val)
  dispatch({type:'filter_catalogue',payload:input})
}

 
  }

  const handleIncrementHandler=async(id)=>{
console.log(id)
const item=finalState.catalogue.find(item=>Number(item.id)===Number(id))
const newItem={...item,quantity:1,total:item.amount}
console.log(newItem)
const existingItem=finalState.cartItems.find(item=>item.name.trim().toLowerCase()===newItem.name.trim().toLowerCase())
console.log(existingItem,"existing iem")
if(!existingItem){
try{
const response=await addCartItems(newItem)
if(response.data){
  getAllCartItems();
}
}catch(error){
console.error("something went wrong while adding items to cart")
}
}else{
const updateItem=finalState.cartItems.find(item=>item.name.trim().toLowerCase()===newItem.name.trim().toLowerCase())
console.log(updateItem,"updatItem")
updateItem.quantity=Number(updateItem.quantity)+1,
updateItem.total=Number(updateItem.total)+Number(updateItem.amount)

try{
const response=await updateCartItems(id,updateItem)
if(response.data){
  getAllCartItems();
}
}
catch(error){
  console.error("something went wrong while updating the cartItems")
}
}
  }
  const getAllCartItems=async()=>{
try{
const response=await getCartItems();
if(response.data){
  dispatch({type:'cartItems',payload:response.data})
}
}
catch(error){
  console.error("something went wrong while fetching the cart items")
}
  }

  const navigation=(id)=>{
    navigate(`/product/${id}`)
  }
  useEffect(() => {
    getAllCategories();
    getAllCatalogue();
    getAllCartItems();
  }, []);

  return (
    <>
      <div className="container">
        <Link to="/product"></Link>
        <h1>Products</h1>
        <productContext.Provider value={{ finalState: finalState,onInputChange:onInputChange,handleIncrementHandler:handleIncrementHandler,navigation:navigation}}>
          <div className="row">
            <div className="col-3">
              <Category />
            </div>
            <div className="col-9">
              <ProductList />
            </div>
          </div>
        </productContext.Provider>
      </div>
    </>
  );
};

export default Products;
