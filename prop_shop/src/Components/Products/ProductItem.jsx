import React,{useState,useEffect} from 'react'
import { Link,useParams } from 'react-router-dom';
import { getItems,getCartItems,addItemToCart,updateItemToCart } from '../../constants/manageCatalogue';

const ProductItem = () => {
    const {id}=useParams();
    const [items,setItems]=useState({})
    const [addedCartItems,setAddedCartItems]=useState([])
    console.log(items,"items")
    const getAllItems=async()=>{
        try{
            console.log(id)
            const response=await getItems()
            console.log(response.data)
            const reqItem=response.data.find(item=>Number(item.id)===Number(id))
            setItems(reqItem)
            console.log(reqItem,'reqItem')
        }
        catch(error){
            console.error("something went wrong while fetching the items")
        }
    }
    const getAllCartItems=async()=>{
        try{
            const response=await getCartItems();
            setAddedCartItems(response.data)
        }catch(error){
            console.error("something went wrong while fetching cart Items")
        }
    }
    const handleAddToCart=async(id)=>{
  
        const updateItem={name:items.name,quantity:1,price:items.amount,total:items.amount,description:items.description,itemsLeft:items.itemLeft,maxQuantity:items.maxItems,category:items.category}
        console.log(updateItem)
        const existingItem = addedCartItems.find(item => item.name.trim().toLowerCase() === updateItem.name.trim().toLowerCase());
       console.log(existingItem,"existing item")
      
      try{
        if(!existingItem){
          const response=await addItemToCart(updateItem) 
          if(response.data){
            getAllCartItems();
            navigate("/cart")
          }
        }
        else{
          const update=addedCartItems.find(item=>item.name.trim().toLowerCase()===updateItem.name.trim().toLowerCase())
          update.total=Number(update.total)+Number(update.price)
          update.quantity=Number(update.quantity)+1
          console.log(update,"update")
           const response=await updateItemToCart(existingItem.id,update) 
           if(response.data){
            getAllCartItems();
            navigate("/cart")
           }
        }
      
      }
      catch(error){
        console.error("something went wrong while adding an item to the cart")
      }
      }
    useEffect(()=>{
getAllItems();
getAllCartItems();
    },[])
  return (
    <>
    <div className='container'>
    <Link to={`/product/${id}`}></Link>
    <div class="card" >
  <div class="card-body">
    <h5 class="card-title">{items.name}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">{items.description}</h6>
    <p class="card-text">{items.itemLeft} items left in store.</p>
   <button type="button" className="btn btn-primary" onClick={()=>handleAddToCart(items.id)}>Add to Cart</button>
  </div>
</div>
</div>
    </>
  )
}

export default ProductItem