import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getCartItems,updateItemToCart,removeItemsfromCart } from '../constants/manageCatalogue'
const Cart = () => {
  const [cartItems,setCartItems]=useState([])

  const getAllCartItems=async()=>{
try{
const response=await getCartItems();
setCartItems(response.data)
console.log(response.data)
}
catch(error){
  console.error("something went wrong while getting the cart items")
}
  }

  const addItemTocart=async(id)=>{
const item=cartItems.find(item=>item.id===id)
const updateData={...item};
updateData.quantity=Number(updateData.quantity)+1
updateData.total=Number(updateData.total)+Number(updateData.price)
console.log(updateData)
if(item){
  try{
const response=await updateItemToCart(id,updateData)
if(response.data){
  getAllCartItems()
}
  }
  catch(error){
    console.error("something went wrong while adding item to cart")
  }
}
  }

  const removeItemsFromCart=async(id)=>{
    const item=cartItems.find(item=>item.id===id)
    console.log(item,"item")
    console.log(id)
    if (item.quantity === 1) {
      try {   
       const response=await removeItemsfromCart(id)
       if(response.data){
        getAllCartItems()
       }
         //setCartItems(cartItems.filter(item => item.id !== id)); // Update the cartItems state after deletion
       } catch (error) {
         console.error('Error removing item from cart:', error);
       }
    
  }
else{
  const updateData={...item};
  updateData.quantity=Number(updateData.quantity)-1
  updateData.total=Number(updateData.total)-Number(updateData.price)
  try{
    const response=await updateItemToCart(id,updateData)
    if(response.data){
      getAllCartItems()
    }
      }
      catch(error){
        console.error("something went wrong while adding item to cart")
      }
}
  }

  const successMessage=()=>{
    swal({
      title: "Success",
      text: "Successfully purchased the products",
      icon: "success",
      dangerMode: true,
    })
    .then(
      setCartItems([])
    );
  }

  useEffect(()=>{
getAllCartItems()
  },[])
  //const totalSum = cartItems.reduce((accumulator, item) => accumulator + Number(item.total), 0);

  return (
   <>
   <div className='container'>
   <Link to='/cart'></Link>
   <h1>Cart</h1>
   {cartItems.map(item=>(<>
    <div class="card my-3" >
  <div class="card-body">
    <h5 class="card-title">{item.name}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">{item.description}</h6>
    <p class="card-text">{item.itemsLeft} items left in the store</p>
    <h5>Total: <b>{item.total}</b>({item.price} per item)</h5>
    <p>{item.quantity} number of items added to cart</p>
    <div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-primary" onClick={()=>removeItemsFromCart(item.id)}>-</button>
  <button type="button" class="btn btn-primary">{item.quantity}</button>
  <button type="button" class="btn btn-primary"onClick={()=>addItemTocart(item.id)}>+</button>
</div>
  </div>
</div>
   </>))}
   <h1>Items:{cartItems.reduce((acc,item)=>Number(item.quantity)+acc,0)}</h1>
   <h1>Total:{cartItems.reduce((acc,item)=>Number(item.total)+acc,0)}</h1>
   <button type='button'className='btn btn-primary' onClick={successMessage}>Checkout</button>
   </div>
   </>
  )
}

export default Cart