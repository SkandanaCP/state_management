import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { getCartItems } from '../../store/ProductAction'
import { useSelector,useDispatch } from 'react-redux'
import { updateCartItem,removeCartItems } from '../../store/ProductAction'
const Cart = () => {
  const dispatch=useDispatch();
  const cartItems=useSelector(state=>state.ProductSlice.cartItems)
  console.log(cartItems,"cart items123")
  const handleIncrement=(id)=>{
  const item=cartItems.find(item=>Number(item.id)===Number(id))
  const type='increment'
dispatch(updateCartItem(id,item,type))
}
const handleDecrement=(id)=>{
  const item=cartItems.find(item=>Number(item.id)===Number(id))
  console.log(item.quantity,"item")
  const type='decrement'
  if(item.quantity===1){
dispatch(removeCartItems(id))
  }else{
    dispatch(updateCartItem(id,item,type)) 
  }
}
const handleCheckout=()=>{

}
  useEffect(()=>{
    dispatch(getCartItems())
  },[dispatch])
  return (
    <div className='container'>
    <Link to='/cart'></Link>
     <h1>Cart</h1>
     {cartItems.map(item=>(
   <div class="card">
   <div class="card-body">
     <h5 class="card-title">{item.name}</h5>
     <h6 class="card-subtitle mb-2 text-body-secondary">{item.description}</h6>
     <p class="card-text">{item.itemsLeft} items left in store</p>
     <p class="card-text">RS.{item.total} (RS{item.amount} per item)</p>
     <div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-primary"onClick={()=>handleDecrement(item.id)}>-</button>
  <button type="button" class="btn btn-primary">{item.quantity}</button>
  <button type="button" class="btn btn-primary" onClick={()=>handleIncrement(item.id)}>+</button>
</div>
   </div>
 </div>
     ))}
    <h4>Total Quantity:{cartItems.reduce((acc,item)=>Number(item.quantity)+acc, 0)}</h4>
    <h4>Total Amount:{cartItems.reduce((acc,item)=>Number(item.total)+acc, 0)}</h4>
    {/* <button type="button" class="btn btn-primary" onClick={handleCheckout}>Checkout</button> */}
    </div>
   
  )
}

export default Cart