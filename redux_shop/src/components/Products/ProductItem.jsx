import React,{useEffect} from 'react'
import { Link ,useParams} from 'react-router-dom'
import { getAllProducts,getCartItems,addItemsToCarts,updateCartItem } from '../../store/ProductAction'
import { useSelector,useDispatch } from 'react-redux'
const ProductItem = () => {
    const dispatch=useDispatch()
    const products=useSelector(state=>state.ProductSlice.CategoryItems)
    const cartItems=useSelector(state=>state.ProductSlice.cartItems)
    const addItemToCart = (id) => {
        console.log(id)
          const itemToAdd=products.find(item=>Number(item.id)===Number(id))
          const data={...itemToAdd}
          console.log(cartItems,"cartItems")
          const existingItem=cartItems.find(item=>item.name===data.name)
          console.log(existingItem,"existing item")
          const type="increment"
          if (!existingItem){
            dispatch(addItemsToCarts(data))
          }
        else{
          dispatch(updateCartItem(id,existingItem,type))
          dispatch(getCartItems())
        }
        
          };
    useEffect(()=>{
dispatch(getAllProducts())
    },[dispatch])
    const {id}=useParams()
    const item=products.find(item=>Number(item.id)===Number(id))
    console.log(item)
  return (
    <div className='container'>
    <Link to={`/item/${id}`}></Link>
    <div class="card" >
  <div class="card-body">
    <h5 class="card-title">{item.name}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">{item.description}</h6>
    <p class="card-text">{item.maxItems} items left in store</p>
    <p class="card-text">RS {item.amount} per item</p>
    <button type="button" className='btn btn-primary' onClick={()=>addItemToCart(item.id)}>add to cart</button>
  </div>
</div>
    </div>
  )
}

export default ProductItem