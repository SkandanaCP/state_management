import React,{useReducer,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { getCartItems,deleteCartItems,updateCartItems } from './appConstants/manageCatalogue'
import swal from 'sweetalert';
const initialState={
  cartItems:[],
  totalItems:'',
  totalQuantity:''
}
const reducer =(state,action)=>{
  if(action.type==='cartItems'){
return {...state,cartItems:action.payload}
  }
  else if(action.type==='clear'){
    return{...state,cartItems:action.payload}
  }
}
const Cart = () => {

  const getAllCartItems=async()=>{
    try{
const response=await getCartItems();
if(response.data){
  dispatch({type:"cartItems",payload:response.data})
}
    }
    catch(error){
      console.error("something went wrong while fetching the cart items")
    }
  }
  const handleIncrement=async(id)=>{
    const item=finalState.cartItems.find(item=>Number(item.id)===Number(id))
    const updateItem={...item}
    updateItem.quantity=Number(updateItem.quantity)+1
    updateItem.total=Number(updateItem.total)+Number(updateItem.amount)
    try{
      const response=await updateCartItems(id,updateItem)
      if(response.data){
        getAllCartItems();
      }
    }
    catch(error){
      console.error("something went wrong while adding item to cart")
    }
  }
  const handleDecrement=async(id)=>{
const item=finalState.cartItems.find(item=>Number(item.id)===Number(id))
if(item.quantity===1){
try{
const response=await deleteCartItems(id);
if(response.data){
  getAllCartItems();
}
}
catch(error){
  console.error("something went wrong while removing the item from cart")
}
}else{
const updateItem={...item}
updateItem.quantity=Number(updateItem.quantity)-1
updateItem.total=Number(updateItem.total)-Number(updateItem.amount)
try{
const response=await updateCartItems(id,updateItem)
if(response.data){
  getAllCartItems()
}
}
catch(error){
  console.error("soemthing went wrong while removing items from cart")
}
}
  }
  const handleCheckout=async()=>{
    try{
      swal({
        title: "success",
        text: "Succesfully purchased the items",
        icon: "success",
      }).then(dispatch=>dispatch({type:'clear',payload:[]}))
      
      getAllCartItems()
    }
   catch(error){
    console.error("something went wrong while checking out")
   }
  }
  useEffect(()=>{
    getAllCartItems()
  },[])
  const [finalState,dispatch]=useReducer(reducer,initialState)
  return (
   <>
   <div className='container'>
   <Link to="cart"></Link>
   <h1>Cart</h1>
   {finalState.cartItems.map(item=>(
    <>
     <div class="card my-2">
  <div class="card-body">
    <h5 class="card-title">{item.name}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">{item.description}</h6>
    <p class="card-text">{item.itemsLeft} items left in store</p>
    <h6>Total:Rs{item.total} (price per item Rs{item.amount})</h6>
    <div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-primary"onClick={()=>handleDecrement(item.id)}>-</button>
  <button type="button" class="btn btn-primary">{item.quantity}</button>
  <button type="button" class="btn btn-primary"onClick={()=>handleIncrement(item.id)}>+</button>
</div>
  </div>
</div>
    </>
   ))}
   <h5>TotalItems:{finalState.cartItems.reduce((acc,item)=>Number(item.quantity)+acc,0)}</h5>
   <h5>Total Amount:{finalState.cartItems.reduce((acc,item)=>Number(item.total)+acc,0)}</h5>
   <button type="button" class="btn btn-primary" onClick={handleCheckout}>Checkout</button>
   </div>
   </>
  )
}

export default Cart