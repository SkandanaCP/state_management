import React,{useEffect} from 'react'
import { getAllProducts } from '../../store/ProductAction'
import { useSelector,useDispatch } from 'react-redux'
import { ProductActions } from '../../store/ProductSlice'
import { addItemsToCarts } from '../../store/ProductAction'
import { getCartItems,updateCartItem } from '../../store/ProductAction'
import { useNavigate } from 'react-router-dom'
const ProductList = () => {
const dispatch=useDispatch()
const navigate=useNavigate()
const CategoryItems=useSelector(state=>state.ProductSlice.CategoryItems)
const products=useSelector(state=>state.ProductSlice.products)
const cartItems=useSelector(state=>state.ProductSlice.cartItems)
console.log(cartItems,"cartitems 123")
const addItemToCart = (id) => {
console.log(id)
  const itemToAdd=CategoryItems.find(item=>Number(item.id)===Number(id))
  const data={...itemToAdd}
  console.log(cartItems,"cartItems")
  const existingItem=cartItems.find(item=>item.name.trim().toLowerCase()===data.name.trim().toLowerCase())
  console.log(existingItem,"existing item")
  const type="increment"
  if (!existingItem){
    dispatch(addItemsToCarts(data))
  }
else{
  dispatch(updateCartItem(id,existingItem,type))
}

  };
  
    useEffect(()=>{
    dispatch(getAllProducts())
    dispatch(getCartItems())
    },[dispatch])
  return (
    <div className='row'>
    {CategoryItems.map(item=>(
        <>
        <div className='col-3'><div class="card" onClick={()=>navigate(`/item/${item.id}`)} >
    <div class="card-body">
      <h5 class="card-title">{item.name}</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">{item.description}</h6>
      <p class="card-text">{item.itemsLeft} items left in store</p>
      <p class="card-text">RS.{item.amount} per item</p>
      <button type="button" class="btn btn-primary" onClick={()=>addItemToCart(item.id)}>Add To Cart</button>
    </div>
  </div></div>
        </>
    ))}
    
    </div>
    
  )
}

export default ProductList