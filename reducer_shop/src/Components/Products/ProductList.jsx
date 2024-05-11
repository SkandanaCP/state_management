import React,{useContext} from 'react'
import { productContext } from './Products'
const ProductList = () => {
    const context=useContext(productContext)
  return (
    <>
    <div className='row'>
   {context.finalState.filteredValues.map(item=>(<>
   <div className='col-4'>
    <div class="card" onClick={()=>context.navigation(item.id)}>
  <div class="card-body">
    <h5 class="card-title">{item.name}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">{item.description}</h6>
    <p class="card-text">{item.itemsLeft}items left in store</p>
    <p>{item.amount} Rs per item</p>
    <button type="button" class="btn btn-primary" onClick={()=>context.handleIncrementHandler(item.id)}>add to cart</button>
  
  </div>
</div>
</div>
   </>))}
   </div>
    </>
  )
}

export default ProductList