import React,{useReducer,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { getCatalogue,getCartItems,addCartItems,updateCartItems } from '../appConstants/manageCatalogue'
const initialState={
    catalogue:{},
    cartItems:[]
}

const reducer=(state,action)=>{
    if(action.type==='fetch_Catalogue'){
        return{...state,catalogue:action.payload}
    }
    else if(action.type==='cartitems'){
        return {...state,cartItems:action.payload}
    }
}
const ProductItem = () => {
    const {id}=useParams()
const [finalState,dispatch]=useReducer(reducer,initialState)
console.log(finalState)
    const fetchProductItems=async()=>{
        try{
            const response=await getCatalogue()
            console.log(response.data)
            if(response.data){
                const item=response.data.find(item=>Number(item.id)===Number(id))
               dispatch({type:'fetch_Catalogue',payload:item})
            }
        }
        catch(error){
            console.error("something went wrong fetching the products")
        }
    }
    const handleIncrement=async()=>{
const existingItem=finalState.cartItems.find(item=>item.name.trim().toLowerCase()===finalState.catalogue.name.trim().toLowerCase())
console.log(existingItem)
if(!existingItem){
    const item={...finalState.catalogue,quantity:1,total:finalState.catalogue.amount}
    console.log(item)
    try{
const response=await addCartItems(item)
if(response.data){
    fetchCartItems()
}
    }catch(error){
        console.error("something went wrong while adding item to cart")
    }
}else{
    const item=finalState.cartItems.find(item=>item.name.trim().toLowerCase()===finalState.catalogue.name.trim().toLowerCase())
    item.quantity=Number(item.quantity)+1;
    item.total=Number(item.total)+Number(item.amount)
    console.log(item)
    try{
const response=await updateCartItems(id,item)
if(response.data){
    fetchCartItems()
}
    }catch(error){
        console.error("something went wrong while adding item to cart")
    }
}
    }
    const fetchCartItems=async()=>{
        try{
        const response=await getCartItems();
            if(response.data){
              
                dispatch({type:'cartitems',payload:response.data})
            }
        }catch(error){
            console.error("something went wrong while fetching the cart items")
        }
    }
    useEffect(()=>{
        fetchProductItems()
        fetchCartItems()},[])
  return (
    <div className='container'>
    <Link to={`/product/${id}`}></Link>
    <div class="card">
  <div class="card-body">
    <h5 class="card-title">{finalState.catalogue.name}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">{finalState.catalogue.description}</h6>
    <p class="card-text">{finalState.catalogue.itemsLeft} items left in store</p>
   <p>RS. {finalState.catalogue.amount} per item</p>
   <button type="button" class="btn btn-primary" onClick={handleIncrement}>Add to Cart</button>
  </div>
</div>
    </div>
  )
}

export default ProductItem